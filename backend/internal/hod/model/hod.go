package model

type Hod struct {
	Name       string `json:"hod_name" bson:"hod_name"`
	Email      string `json:"hod_email" bson:"hod_email"`
	Password   string `json:"hod_password" bson:"hod_password"`
	Department string `json:"hod_department" bson:"hod_department"`
}

type PasswordUpdation struct {
	Email      string `json:"hod_email" bson:"hod_email"`
	OldPassword   string `json:"hod_old_password" bson:"hod_old_password"`
	NewPassword   string `json:"hod_new_password" bson:"hod_new_password"`
}

type Coordinator struct {
	Name        string `json:"name" bson:"name"`
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"`
	Department  string `json:"department" bson:"department"`
	Designation string `json:"designation" bson:"designation"`
	TenureStart string `json:"tenureStart" bson:"tenureStart"`
	TenureEnd   string `json:"tenureEnd" bson:"tenureEnd"`
}
