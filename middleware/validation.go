package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"webforum/db"
	model "webforum/models"

	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func ValidationMiddleware(c *gin.Context) {
	//get the cookie
	//MUST GET THE AUTHORISATION HEADER NOT THE COOKIE!
	//BEARER IS A KEY WORD THAT SINGIFIES THAT YOU ARE SENDING A AUTH TOKEN
	tokenString := c.GetHeader("Authorization")

	//decode and validate the cookie
	//https://pkg.go.dev/github.com/golang-jwt/jwt/v5#example-Parse-Hmac

	tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	if tokenString == "" {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"message": "Authorisation failed, tokenstring is empty"})
		return
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})
	if err != nil {
		log.Println("Token err", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "token error"})
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		//Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Passed validity period"})

		}

		//find user with the token
		var user model.UserAuth
		dbConn := db.GetAuthDB()
		if dbConn == nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Could not retrive db"})
			return
		}
		//bind the info to user if user_id is found
		result := dbConn.First(&user, claims["user_id"])

		if result.Error != nil || user.Id == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "User not found"})
			return
		}
		//Attach to the req
		c.Set("user_id", user.Id)

		c.Next()

		//fmt.Println(claims["user_id"], claims["exp"])
	} else {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"message": "You are unauthorised!"})
	}

}
