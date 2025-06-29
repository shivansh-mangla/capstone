package model

type Doaa struct {
	Name     string `json:"doaa_name" bson:"doaa_name"`
	Email    string `json:"doaa_email" bson:"doaa_email"`
	Password string `json:"doaa_password" bson:"doaa_password"`
}
