package service

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/shivansh-mangla/capstone/backend/internal/student/model"
	"github.com/shivansh-mangla/capstone/backend/internal/student/repository"
	"github.com/shivansh-mangla/capstone/backend/internal/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func CreateStudent(c *fiber.Ctx) error {
	student := new(model.Student)

	if err := c.BodyParser(student); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON for student Signup"})
	}
	studentExist, err := repository.CheckStudentExistence(student.ThaparEmail)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Some error occured while checking the existence of student"})
	}

	if studentExist {
		return c.Status(400).JSON(fiber.Map{"error": "Student Already exist"})
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(student.Password), 10)
	student.Password = string(hash)

	// Send confirmation mail to the given email ***************************
	claims := jwt.MapClaims{
		"email": student.ThaparEmail,
		"exp":   time.Now().Add(time.Hour * 24).Unix(), // Token expires in 24 hours
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	JWT_KEY := os.Getenv("JWT_KEY")
	tokenString, _ := token.SignedString([]byte(JWT_KEY))
	utils.SendVerificationEmail(student.ThaparEmail, tokenString)

	err = repository.CreateStudentDB(student)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Student not signed up due to some internal problem"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Student signed up successfully"})
}

func LoginStudent(c *fiber.Ctx) error {

	input := new(model.Student)
	if err := c.BodyParser(input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON for student Login"})
	}

	//find student by email id
	student, err := repository.GetStudentByEmail(input.ThaparEmail)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(400).JSON(fiber.Map{"error": "Student doesnt exist by this email"})
		}
		return c.Status(400).JSON(fiber.Map{"error": "Some error occured while logging in"})
	}

	//compare password
	err = bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(input.Password))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	//check if email is verified
	if !student.Verified {
		return c.Status(400).JSON(fiber.Map{"error": "Please verify your email first"})
	}

	//generate JWT
	claims := jwt.MapClaims{
		"email": student.ThaparEmail,
		"role":  "student",
		"exp":   time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	JWT_KEY := os.Getenv("JWT_KEY")
	tokenString, err := token.SignedString([]byte(JWT_KEY))

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Could not create JWT token for student"})
	}

	return c.Status(202).JSON(fiber.Map{"token": tokenString, "studentData": student})
}

func GetTimeTable(c *fiber.Ctx) error {
	subgroup := c.Query("subgroup")
	fmt.Println(subgroup)
	timeTable, _ := repository.GetTimeTableData(subgroup)
	return c.JSON(timeTable)
}

func RetrieveElectiveBasket() ([]string, error) {
	electiveBasket, err := repository.ElectiveBasketFromDB()
	if err != nil {
		return nil, err
	}
	return electiveBasket.Data, nil
}

func RetrieveSubgroup() ([]string, error) {
	subgroupList, err := repository.SubgroupFromDB()
	if err != nil {
		return nil, err
	}
	return subgroupList.Data, nil
}

// NEED TO CHECK JWT, APPLICATION ID AND RANDOMIZE THE FILE NAME ***************
func UploadReceipt(c *fiber.Ctx) error {
	appID := c.FormValue("applicationID")
	fileHeader, err := c.FormFile("pdf")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "PDF file not received")
	}

	file, err := fileHeader.Open()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to open file")
	}
	defer file.Close()

	// Upload to Cloudinary with random filename
	url, err := utils.UploadToCloudinary(file, "helloo123.pdf")
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Upload failed")
	}

	return c.JSON(fiber.Map{
		"applicationID": appID,
		"url":           url,
	})
}

func UpdateDetails(c *fiber.Ctx) error {
	input := new(model.Student)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for student details update"})
	}
	studentExist, err := repository.CheckStudentExistence(input.ThaparEmail)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Some error occured while checking the existence of student"})
	}

	if studentExist == false {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Student does not exist"})
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)
	input.Password = string(hash)

	err = repository.UpdateDetailsDB(input)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Student details changedp successfully"})
}

func GetElectiveData(c *fiber.Ctx) error {
	data, err := repository.GetElectiveData()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}
	return c.Status(fiber.StatusAccepted).JSON(data)
}


func CreateApplication(c *fiber.Ctx) error {
	input := new(model.ApplicationRequest)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for student application request"})
	}

	student, err := repository.GetStudentByEmail(input.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot get students details for student application request"})
	}

	utilitiesData, err := repository.GetUtilities()
	if(err != nil) {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot get utilities details for student application request"})
	}

	application := new(model.Application)

	if id, ok := utilitiesData["latest_application_id"].(int64); ok {
		application.ApplicationId = fmt.Sprintf("%d", id+1)
		utilitiesData["latest_application_id"] = id + 1

		err = repository.UpdateUtilities(utilitiesData)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot create application id for student application request"})
		}
	} else {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot get utilities application id for student application request"})
	}
	application.Email = student.ThaparEmail
	application.RollNo = student.RollNo
	application.Department = "CSED"
	application.Subgroup = student.Subgroup
	application.ElectiveBasket = student.ElectiveBasket
	application.GeneralElective = student.GeneralElective
	application.OptedCourses = input.OptedCourses
	application.Clashing = input.Clashing
	application.Message = input.Message
	application.Stage = 1

	err = repository.CreateApplicationInDB(application)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Cannot generate application for student "})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"Status": "Student Application successfully created"})
}