package model

type Student struct {
	Name            string `json:"name" bson:"name"`
	RollNo          string `json:"roll_no" bson:"roll_no"`
	AcademicYear    string `json:"academic_year" bson:"academic_year"`
	Branch          string `json:"branch" bson:"branch"`
	Subgroup        string `json:"subgroup" bson:"subgroup"`
	ThaparEmail     string `json:"thapar_email" bson:"thapar_email"`
	ElectiveBasket  string `json:"elective_basket" bson:"elective_basket"`
	GeneralElective string `json:"general_elective" bson:"general_elective"`
	PhoneNumber     string `json:"phone_number" bson:"phone_number"`
	Password        string `json:"password" bson:"password"`
}
