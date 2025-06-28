package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/auth/service"
)

func VerifyStudent(c *fiber.Ctx) error {
	return service.VerifyStudent(c)
}
