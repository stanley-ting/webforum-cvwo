package controller

import (
	"fmt"
	"net/http"
	model "webforum/models"
	services "webforum/svc"

	"github.com/gin-gonic/gin"
)

func GetPost(c *gin.Context) {
	id := c.Param("id")

	post, err := services.GetPostById(id)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Post was not found"})
		return
	}
	c.IndentedJSON(http.StatusAccepted, post)
}

func CreatePost(c *gin.Context) {
	var newPost model.Post

	if err := c.BindJSON(&newPost); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Could not add new post"})
		return
	}

	err := services.CreatePostHandler(newPost)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Could not add new User"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, newPost)

}

func GetAllPosts(c *gin.Context) {
	res, err := services.GetAllPostHandler()

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Cannot retrieve posts"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, res)
}

func GetPostsFromUserId(c *gin.Context) {
	userId := c.MustGet("user_id").(int)

	posts, err := services.GetAllPostsFromUserIdHandler(userId)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Cannot retrieve posts"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": "User posts retrieved!", "posts": posts})
}

func UpdatePost(c *gin.Context) {
	var updatedPost model.Post

	if err := c.BindJSON(&updatedPost); err != nil {
		// Return a bad request if the binding fails
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid request data"})
		return
	}
	fmt.Printf("data %v", updatedPost)
	id := c.Param("id")
	err := services.UpdatePostHandler(&updatedPost, id)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message ": "Cannot update posts"})
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"message": "User posts updated!"})
}
