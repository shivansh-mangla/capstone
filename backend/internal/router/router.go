package router

import (
	"github.com/gofiber/fiber/v2"
	studentHandler "github.com/shivansh-mangla/capstone/backend/internal/student/handler"
)

func SetupRoutes() *fiber.App {
	app := fiber.New()
	api := app.Group("/api")

	// student routes
	student := api.Group("/student")
	student.Post("/register", studentHandler.RegisterStudent)
	student.Post("/login", studentHandler.LoginStudent)

	// hod routes
	// hod := api.Group("/hod")

	return app
}
