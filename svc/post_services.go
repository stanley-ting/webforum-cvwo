package services

import (
	"log"
	"webforum/db"
	model "webforum/models"

	"fmt"

	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

func GetPostById(id string) (*model.Post, error) {
	dbConn := db.GetDB()

	post := &model.Post{}
	query := "SELECT * FROM posts WHERE id = ?"
	res, err := dbConn.Query(query, id)

	if err != nil {
		log.Fatalf("Could not query for id")
		return nil, err
	}

	if res.Next() {
		err = res.Scan(&post.ID, &post.UserID, &post.Title, &post.Description, &post.Status, &post.CreatedAt)
		if err != nil {
			log.Fatalf("Could not execute query %v", err)
			return nil, err
		}

		return post, nil

	}

	return nil, fmt.Errorf("no query found with ID: %s", id)

}

func CreatePostHandler(newPost model.Post) error {
	dbConn := db.GetDB()
	//if using current date dont have to pass it into the exec funciton
	createQuery := "INSERT INTO posts (id, user_id, title , description, status,created_at) VALUES (?,?,?,?,?,CURRENT_DATE())"

	_, err := dbConn.Exec(createQuery, newPost.ID, newPost.UserID, newPost.Title, newPost.Description, newPost.Status)

	if err != nil {
		log.Fatalf("Post could not be added due to incorrect field %v", err)
		return err
	}

	return nil

}

func GetAllPostHandler() ([]model.Post, error) {
	dbConn := db.GetDB()

	getQuery := "SELECT * FROM posts"

	res, err := dbConn.Query(getQuery)
	if err != nil {
		log.Fatalf("Posts could be retrieved %v", err)
		return nil, err
	}
	posts := []model.Post{}
	for res.Next() {
		var post model.Post

		err := res.Scan(&post.ID, &post.UserID, &post.Title, &post.Description, &post.Status, &post.CreatedAt)

		if err != nil {
			log.Fatalf("Something went wrong during the scanning %v", err)
			return nil, err
		}

		posts = append(posts, post)
	}

	return posts, nil

}

func GetAllPostsFromUserIdHandler(userId int) ([]model.Post, error) {
	dbConn := db.GetDB()

	getQuery := "SELECT * FROM posts WHERE user_id = ?"

	res, err := dbConn.Query(getQuery, userId)
	if err != nil {
		log.Fatalf("Indiviudal Posts could be retrieved %v", err)
		return nil, err
	}
	posts := []model.Post{}

	for res.Next() {
		var post model.Post

		err := res.Scan(&post.ID, &post.UserID, &post.Title, &post.Description, &post.Status, &post.CreatedAt)

		if err != nil {
			log.Fatalf("Something went wrong during the scanning %v", err)
			return nil, err
		}

		posts = append(posts, post)
	}

	return posts, nil
}

func UpdatePostHandler(post *model.Post, id string) error {
	dbConn := db.GetDB()
	idInt, _ := strconv.Atoi(id)

	putQuery := "UPDATE posts SET title = ?, description = ?, status = ? WHERE id = ?"

	_, err := dbConn.Exec(putQuery, post.Title, post.Description, post.Status, idInt)

	if err != nil {
		log.Fatalf("Post not updated due to incorrect field %v", err)
		return err
	}

	return nil

}
