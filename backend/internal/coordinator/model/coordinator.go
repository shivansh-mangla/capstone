package model


type Coordinator struct {
	Name        string `json:"name" bson:"name"`
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"`
	Department  string `json:"department" bson:"department"`
	Designation string `json:"designation" bson:"designation"`
	TenureStart string `json:"tenureStart" bson:"tenureStart"`
	TenureEnd   string `json:"tenureEnd" bson:"tenureEnd"`
}
