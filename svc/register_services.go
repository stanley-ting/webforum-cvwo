package services

import (
	"log"
	"webforum/db"
	model "webforum/models"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(user model.UserAuth) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash password %v", err)
		return err
	}

	pass := string(hash)
	log.Printf("Generated Hash: %s", pass)

	newUser := model.UserAuth{Name: user.Name, Password: pass}
	dbConn := db.GetAuthDB()

	if dbConn == nil {
		log.Fatal("Database connection is nil")
		return nil
	}

	res := dbConn.Create(&newUser)

	if res.Error != nil {
		log.Fatalf("Failed to create user %v", res.Error)
		return res.Error
	}

	return nil

}
