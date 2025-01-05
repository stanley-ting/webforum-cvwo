package controller

import (
	"net/http"
	model "webforum/models"
	services "webforum/svc"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var newUser model.UserAuth

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "User data format issue"})
		return
	}

	err := services.RegisterHandler(newUser)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "User was not registered successfully"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": "Registered successfully!"})

}
