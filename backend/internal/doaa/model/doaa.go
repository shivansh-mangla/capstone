package model

type Doaa struct {
	Name     string `json:"doaa_name" bson:"doaa_name"`
	Email    string `json:"doaa_email" bson:"doaa_email"`
	Password string `json:"doaa_password" bson:"doaa_password"`
}

type PasswordUpdation struct {
	OldPassword string `json:"doaa_old_password" bson:"doaa_old_password"`
	NewPassword string `json:"doaa_new_password" bson:"doaa_new_password"`
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
