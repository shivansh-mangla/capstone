package model

type Hod struct {
	Name     string `json:"hod_name" bson:"hod_name"`
	Email    string `json:"hod_email" bson:"hod_email"`
	Password string `json:"hod_password" bson:"hod_password"`
	Department string `json:"hod_department" bson:"hod_department"`
}
