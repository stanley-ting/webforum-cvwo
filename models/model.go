package model

import (
	"time"
)

type User struct {
	ID        int       `json:"id" db:"id"` // Primary Key
	Username  string    `json:"username" db:"username"`
	Email     string    `json:"email" db:"email"`
	Password  string    `json:"password" db:"password"`
	CreatedAt time.Time `json:"created_at" db:"created_at"` // Timestamp
}

type Post struct {
	ID          int       `json:"id" db:"id"`                   // Primary Key
	UserID      int       `json:"user_id" db:"user_id"`         // Foreign Key: User
	Title       string    `json:"title" db:"title"`             // Title of the favor
	Description string    `json:"description" db:"description"` // Description of the favor
	Status      string    `json:"status" db:"status"`           // e.g., "open", "completed"
	CreatedAt   time.Time `json:"created_at" db:"created_at"`   // Timestamp
}

type Comment struct {
	ID        int       `json:"id" db:"id"`                 // Primary Key
	PostID    int       `json:"post_id" db:"post_id"`       // Foreign Key: Post
	UserID    int       `json:"user_id" db:"user_id"`       // Foreign Key: User
	Content   string    `json:"content" db:"content"`       // Comment text
	CreatedAt time.Time `json:"created_at" db:"created_at"` // Timestamp
}

type Messages struct {
	ID       int       `json:"id" db:"id"`               // Primary Key
	ChatID   int       `json:"chat_id" db:"chat_id"`     // Foreign Key: User
	SenderID string    `json:"sender_id" db:"sender_id"` // Notification message
	Content  string    `json:"content" db:"content"`     // content
	SentAt   time.Time `json:"sent_at" db:"sent_at"`     // Timestamp
}

type Chats struct {
	ID         int       `json:"id" db:"id"`                   // Primary Key
	CreatorID  int       `json:"creator_id" db:"creator_id"`   // Foreign Key: User
	ReceiverID string    `json:"receiver_id" db:"receiver_id"` // Notification message
	CreatedAt  time.Time `json:"created_at" db:"created_at"`   // Timestamp
}
