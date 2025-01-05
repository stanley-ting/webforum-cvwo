package controller

import (
	"net/http"
	model "webforum/models"
	services "webforum/svc"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var body model.UserAuth

	if err := c.BindJSON(&body); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Could not read from body"})
		return
	}

	tokenString, id, err := services.LoginHandler(body)
	if err != nil || tokenString == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "No token string returned/ error encounetred"})
		return
	}
	//the second last boolean for secure should be set to true if hosted online
	//set cookie

	//Cookie is set under the same Authorization- refer to PostMan
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.IndentedJSON(http.StatusAccepted, gin.H{"message ": "Successfully logged in", "token": tokenString, "userId": id})

}

// Validation for middleware
func Validate(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Connected!"})
}
