package service

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/student/model"
	"github.com/shivansh-mangla/capstone/backend/internal/student/repository"
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

	err = repository.CreateStudentDB(student)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Student not signed up due to some internal problem"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Student signed up successfully"})
}

func LoginStudent(c *fiber.Ctx) error {
	fmt.Println("We are in login")

	input := new(model.Student)
	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for student Login"})
	}

	//find user by roll number

	//compare password

	//generate JWT

	return nil
}
