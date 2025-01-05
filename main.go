package main

import (
	"log"
	"webforum/db"
	initisaliser "webforum/initialiser"
	"webforum/routes"
)

func init() {
	//for env variables
	initisaliser.LoadEnv()
	//for auth db
	db.ConnectDBAuth()
	//for data db
	db.Connect()
	//
	initisaliser.SyncDB()
}

func main() {

	//used to connect to the db

	//routing
	r := routes.SetupRouter()
	if err := r.Run("localhost:8080"); err != nil {
		log.Fatalf("Could not start the server %v", err)
	}

}

// router := gin.Default()
// router.GET("/favours" , getFavours)
// router.GET("/favours/:id" , getFavoursById)
// router.POST("/favours", addFavours)
// router.PATCH("/favours/:id" , editFavours)
// router.DELETE("/favours/:id", deleteFavours)
