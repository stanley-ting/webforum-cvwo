package services

import (
	"log"
	"os"
	"webforum/db"
	model "webforum/models"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"

	"time"

	"strings"

	"github.com/golang-jwt/jwt/v4"
)

func LoginHandler(input model.UserAuth) (string, int, error) {
	dbConn := db.GetAuthDB()
	if dbConn == nil {
		log.Fatalf("db returned nil")
	}
	//user is used to store the username and password retieved from the db
	var user model.UserAuth
	dbConn.First(&user, "Name = ?", input.Name)

	if user.Id == 0 {
		log.Fatalf("INPUT ID IS NIL")
	}

	input.Password = strings.TrimSpace(input.Password)
	//COMPARE HASH AND PASSWORD, I PUT PASSWORD AND HASH IDIOT

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))

	if err != nil {
		log.Fatalf("Wrong password input %v", err)
		return "", 0, err
	}

	//generate jwt token
	//this code was taken from https://pkg.go.dev/github.com/golang-jwt/jwt/v5#example-Parse-Hmac
	claims := jwt.MapClaims{
		"user_id": user.Id,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // Token expires in 72 hours
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		log.Fatalf("Could not get token-string")
		return "", 0, err
	}

	return tokenString, user.Id, nil

}
