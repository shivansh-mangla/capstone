package model

type Student struct {
	Name               string   `json:"name" bson:"name"`
	RollNo             string   `json:"roll_no" bson:"roll_no"`
	AcademicYear       string   `json:"academic_year" bson:"academic_year"`
	Branch             string   `json:"branch" bson:"branch"`
	Subgroup           string   `json:"subgroup" bson:"subgroup"`
	ThaparEmail        string   `json:"thapar_email" bson:"thapar_email"`
	ElectiveBasket     string   `json:"elective_basket" bson:"elective_basket"`
	GeneralElective    string   `json:"general_elective" bson:"general_elective"`
	PhoneNumber        string   `json:"phone_number" bson:"phone_number"`
	Password           string   `json:"password" bson:"password"`
	Verified           bool     `json:"verified" bson:"verified"`
	Applications       []string `json:"applications" bson:"applications"`
	OngoingApplication string   `json:"ongoing_application" bson:"ongoing_application"`
	Department         string   `json:"department" bson:"department"`
}

type ElectiveBasket struct {
	Data []string `json:"data" bson:"data"`
}

type Subgroup struct {
	Data []string `json:"data" bson:"data"`
}

type ApplicationRequest struct {
	Email        string     `json:"email" bson:"email"`
	OptedCourses [][]string `json:"opted_courses" bson:"opted_courses"`
	Message      string     `json:"message" bson:"message"`
	Clashing     bool       `json:"clashing" bson:"clashing"`
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
