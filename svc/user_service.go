package services

import (
	"log"
	"webforum/db"
	model "webforum/models"

	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetUserById(id string) (*model.User, error) {
	dbConn := db.GetDB()

	if dbConn == nil {
		log.Fatalf("Could not establish a database connection")
	}

	user := &model.User{}
	query := "SELECT * FROM users WHERE id = ?"
	res, err := dbConn.Query(query, id)

	if err != nil {
		log.Printf("Error querying the database: %v", err)
		return nil, err // Return the error to the caller
	}

	if res.Next() {
		err = res.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
		if err != nil {
			log.Fatalf("Could not execute query %v", err)
			return nil, err
		}

		return user, nil

	}

	return nil, fmt.Errorf("no query found with ID: %s", id)

}

func CreateUserHandler(user model.User) error {
	dbConn := db.GetDB()

	createQuery := "INSERT INTO users (id, username, email, password, created_at) VALUES (?,?,?,?,CURRENT_DATE())"
	_, err := dbConn.Exec(createQuery, user.ID, user.Username, user.Email, user.Password)

	if err != nil {
		fmt.Println("Error could not add user", err.Error())
		return err
	}

	return nil
}

func GetAllUserHandler() ([]model.User, error) {
	users := []model.User{}

	dbConn := db.GetDB()

	getQuery := "SELECT * FROM users"

	res, err := dbConn.Query(getQuery)

	if err != nil {
		fmt.Println("Could not get users from db", err.Error())
		return nil, err
	}

	for res.Next() {
		var user model.User

		err = res.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)

		if err != nil {
			fmt.Println("Something went wrong", err.Error())
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil

}
