package model

type UserAuth struct {
	Id       int    `json:"id" gorm:"unique"`
	Name     string `json:"name" gorm:"unique"`
	Password string `json:"password"`
}
