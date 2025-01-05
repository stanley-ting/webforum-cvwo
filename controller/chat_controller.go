package controller

import (
	"net/http"
	model "webforum/models"
	services "webforum/svc"

	"github.com/gin-gonic/gin"
)

func CreateChat(c *gin.Context) {
	var request struct {
		CreatorID  int `json:"creator_id"`
		ReceiverID int `json:"receiver_id"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid data, could not read creator/receiver id"})
		return
	}

	chatId, err := services.CreateChatHandler(request)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Chatid cannot be retrieved!"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": chatId})

}

func GetChatMessages(c *gin.Context) {
	chatID := c.Param("chat_id")

	messages, err := services.GetChatMessagesHandler(chatID)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, err)
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": "Chat messages were read successfully", "messages": messages})

}

func SendMessage(c *gin.Context) {
	var message model.Messages
	if err := c.BindJSON(&message); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Could not read the message body"})
		return
	}

	err := services.SendMessageHandler(message)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, err)
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": "Chat messages were sent successfully"})
}
