package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/doaa/service"
)

func LoginDoaa(c *fiber.Ctx) error {
	return service.LoginDoaa(c)
}

func UpdateDoaaName(c *fiber.Ctx) error {
	return service.UpdateDoaaName(c)
}

func UpdateDoaaPassword(c *fiber.Ctx) error {
	return service.UpdateDoaaPassword(c)
}

func GetAllCoordinatorsDetails(c *fiber.Ctx) error {
	return service.GetAllCoordinatorsDetails(c)
}