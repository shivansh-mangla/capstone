package service

import (
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

	hash, _ := bcrypt.GenerateFromPassword([]byte(student.Password), 10)
	student.Password = string(hash)

	repository.CreateStudentDB(student)

	return nil
}
