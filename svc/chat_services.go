package services

import (
	"database/sql"
	"log"
	"webforum/db"
	model "webforum/models"

	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Request struct {
	CreatorID  int `json:"creator_id"`
	ReceiverID int `json:"receiver_id"`
}

func CreateChatHandler(request Request) (int, error) {
	dbConn := db.GetDB()
	// Check if chat already exists
	var chatID int
	query := "SELECT id FROM chats WHERE creator_id = ? AND receiver_id = ? OR creator_id = ? AND receiver_id = ? LIMIT 1"
	err := dbConn.QueryRow(query, request.CreatorID, request.ReceiverID, request.ReceiverID, request.CreatorID).Scan(&chatID)
	if err == sql.ErrNoRows {
		// Create new chat
		result, err := dbConn.Exec("INSERT INTO chats (creator_id, receiver_id) VALUES (?, ?)", request.CreatorID, request.ReceiverID)
		if err != nil {
			log.Fatal("Could not add new chat to the db")
			return -1, err
		}

		chatID64, _ := result.LastInsertId()
		chatID = int(chatID64)

	} else if err != nil {
		return -1, err
	}

	return chatID, nil

}

func GetChatMessagesHandler(id string) ([]model.Messages, error) {
	dbConn := db.GetDB()
	getQuery := "SELECT id, chat_id, sender_id, content, sent_at FROM messages WHERE chat_id = ? ORDER BY sent_at"

	rows, err := dbConn.Query(getQuery, id) // Execute query
	if err != nil {
		log.Fatalf("failed to retrieve post! %v", err)
		return nil, err
	}
	defer rows.Close() // Close rows after use

	var messages []model.Messages

	for rows.Next() {
		var message model.Messages
		// Scan each row into the Messages struct
		err := rows.Scan(&message.ID, &message.ChatID, &message.SenderID, &message.Content, &message.SentAt)
		if err != nil {
			log.Fatalf("failed to read message from db %v", err)
		}
		// Append each message to the slice
		messages = append(messages, message)
	}

	return messages, nil

}

func SendMessageHandler(message model.Messages) error {
	dbConn := db.GetDB()
	putQuery := "INSERT INTO messages (chat_id, sender_id, content, sent_at) VALUES (?, ?, ?, ?)"
	message.SentAt = time.Now()
	_, err := dbConn.Exec(putQuery, message.ChatID, message.SenderID, message.Content, message.SentAt)

	if err != nil {
		log.Printf("Could not add the message to the db!")
		return err
	}

	return nil

}
