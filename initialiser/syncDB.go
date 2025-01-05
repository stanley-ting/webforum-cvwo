package initisaliser

import (
	"log"
	"webforum/db"
	model "webforum/models"
)

func SyncDB() {
	dbConn := db.GetAuthDB()
	if dbConn == nil {
		log.Fatal("Database connection is nil")
	}
	//dbConn.AutoMigrate(&model.UserAuth{})

	var dbName string
	err := dbConn.Raw("SELECT DATABASE();").Scan(&dbName).Error
	if err != nil {
		log.Fatal("Failed to get the database name:", err)
	} else {
		log.Println("Connected to the database:", dbName)
	}
	
	if err := dbConn.AutoMigrate(&model.UserAuth{}); err != nil {
		log.Fatalf("Failed to migrate UserAuth model: %v", err)
	} else {
		log.Println("Database migration for UserAuth model completed successfully.")
	}
}
