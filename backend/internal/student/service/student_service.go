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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for student Signup"})
	}
	studentExist, err := repository.CheckStudentExistence(student.RollNo)
	if err != nil {
		fmt.Println("Some error occured while checking the existence of student")
	}

	if studentExist == true {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Student Already exist"})
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(student.Password), 10)
	student.Password = string(hash)

	// Send confirmation mail to the gaiven email ***************************
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
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Student not signed up due to some internal problem"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Student signed up successfully"})
}

func LoginStudent(c *fiber.Ctx) error {

	input := new(model.Student)
	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for student Login"})
	}

	//find student by email id
	student, err := repository.GetStudentByEmail(input.ThaparEmail)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Student doesnt exist by this email"})
		}
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Some error occured while logging in"})
	}

	//compare password
	err = bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(input.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	//check if email is verified
	if !student.Verified {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Please verify your email first"})
	}

	//generate JWT
	claims := jwt.MapClaims{
		"email": student.ThaparEmail,
		"exp":   time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	JWT_KEY := os.Getenv("JWT_KEY")
	tokenString, err := token.SignedString([]byte(JWT_KEY))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not create JWT token"})
	}

	return c.Status(fiber.StatusFound).JSON(fiber.Map{"token": tokenString, "studentData": student})
}
