package controller

import (
	"fmt"
	"net/http"
	model "webforum/models"
	services "webforum/svc"

	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	id := c.Param("id")

	user, err := services.GetUserById(id)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "User was not found"})
		return
	}
	c.IndentedJSON(http.StatusAccepted, user)
}

func GetAllUser(c *gin.Context) {
	users, err := services.GetAllUserHandler()

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Cannot get users"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, users)
}

func CreateUser(c *gin.Context) {
	var newUser model.User

	if err := c.BindJSON(&newUser); err != nil {
		fmt.Printf("%v", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Could not create new user"})
		return
	}

	err := services.CreateUserHandler(newUser)
	if err != nil {
		// If there is an error creating the book, set status to 500
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Could not create new user"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, newUser)

}
