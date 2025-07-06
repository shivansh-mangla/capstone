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


type Application struct {
	ApplicationId   string     `json:"application_id" bson:"application_id"`
	Email           string     `json:"email" bson:"email"`
	RollNo          string     `json:"roll_no" bson:"roll_no"`
	Name            string     `json:"name" bson:"name"`
	Branch          string     `json:"branch" bson:"branch"`
	AcademicYear    string     `json:"year" bson:"year"`
	PhoneNumber     string     `json:"phone_number" bson:"phone_number"`
	Department      string     `json:"department" bson:"department"`
	Subgroup        string     `json:"subgroup" bson:"subgroup"`
	ElectiveBasket  string     `json:"elective_basket" bson:"elective_basket"`
	GeneralElective string     `json:"general_elective" bson:"general_elective"`
	OptedCourses    [][]string `json:"opted_courses" bson:"opted_courses"` // e.g., [["CS101", "Optimization Tech", "A1"], ["MA102", "DSA", "B2"]]
	Clashing        bool       `json:"clashing" bson:"clashing"`
	Comments        [][]string `json:"comments" bson:"comments"` // e.g., [["DOAA", "Clashes with CS102"]]
	Message         string     `json:"message" bson:"message"`
	Stage           int        `json:"stage" bson:"stage"`
	URL             string     `json:"url" bson:"url"`
}
