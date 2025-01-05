package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *sql.DB

func Connect() {
	var err error
	DB, err = sql.Open("mysql", "root@tcp(127.0.0.1:3306)/webforum?parseTime=true")

	if err != nil {
		log.Fatal("Could not connect to database:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Could not ping database:", err)
	}

	log.Println("Successfully connected to the database.")

}

func GetDB() *sql.DB {
	return DB
}

var authDB *gorm.DB

func ConnectDBAuth() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := os.Getenv("AUTHDB")
	var err error
	// Assign the database connection to the global authDB variable
	authDB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Could not connect to auth database:", err)
	}

	log.Println("Successfully connected to the AUTH database.")
}

func GetAuthDB() *gorm.DB {
	return authDB
}
