package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/coordinator/service"
)

func LoginCoordinator(c *fiber.Ctx) error {
	return service.LoginCoordinator(c)
}