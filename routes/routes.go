package routes

import (
	"webforum/controller"
	"webforum/middleware"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"}, // Allow Authorization header
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.Use(cors.Default())
	//User Route
	r.GET("/users/:id", controller.GetUser)
	r.GET("/users", controller.GetAllUser)
	r.POST("/users", controller.CreateUser)
	//Post Route
	r.POST("/posts", controller.CreatePost)
	r.GET("/posts/:id", controller.GetPost)
	r.GET("/posts", controller.GetAllPosts)
	r.GET("/my-posts", middleware.ValidationMiddleware, controller.GetPostsFromUserId)
	r.PUT("/posts/:id", controller.UpdatePost)

	//Auth Route
	r.POST("/register", controller.Register)
	r.POST("/login", controller.Login)
	r.GET("/validate", middleware.ValidationMiddleware, controller.Validate)

	//Messages Route
	r.GET("/chats/:chat_id", controller.GetChatMessages)
	r.POST("/chats/:id", controller.CreateChat)
	r.POST("/chats/:chat_id/messages", controller.SendMessage)

	return r
}
