package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/hod/service"
)

func LoginHod(c *fiber.Ctx) error {
	return service.LoginHod(c)
}

func CreateCoordinator(c *fiber.Ctx) error {
	return service.CreateCoordinator(c)
}


func UpdateHodName(c *fiber.Ctx) error {
	return service.UpdateHodName(c)
}

func UpdateHodPassword(c *fiber.Ctx) error {
	return service.UpdateHodPassword(c)
}