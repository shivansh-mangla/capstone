package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/student/service"
)

func RegisterStudent(c *fiber.Ctx) error {
	return service.CreateStudent(c)
}

func LoginStudent(c *fiber.Ctx) error {
	return service.LoginStudent(c)
}

func GenerateTimeTable(c *fiber.Ctx) error {
	return service.GetTimeTable(c)
}

func GetElectiveBasket() ([]string, error) {
	return service.GetElectiveBasket()
}

func GetSubgroup() ([]string, error){
	return service.GetSubgroup()
}