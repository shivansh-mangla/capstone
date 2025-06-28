package router

import (
	"github.com/gofiber/fiber/v2"
	authHandler "github.com/shivansh-mangla/capstone/backend/internal/auth/handler"
	studentHandler "github.com/shivansh-mangla/capstone/backend/internal/student/handler"
)

func SetupRoutes() *fiber.App {
	app := fiber.New()
	api := app.Group("/api")

	// student routes
	student := api.Group("/student")
	student.Post("/register", studentHandler.RegisterStudent)
	student.Post("/login", studentHandler.LoginStudent)
	student.Get("/gettimetable", studentHandler.GenerateTimeTable)

	// hod routes
	// hod := api.Group("/hod")

	//auth routes
	auth := app.Group("/verify")
	auth.Get("/", authHandler.VerifyStudent)

	return app
}
