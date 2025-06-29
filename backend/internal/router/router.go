package router

import (
	"github.com/gofiber/fiber/v2"
	authHandler "github.com/shivansh-mangla/capstone/backend/internal/auth/handler"
	doaaHandler "github.com/shivansh-mangla/capstone/backend/internal/doaa/handler"
	hodHandler "github.com/shivansh-mangla/capstone/backend/internal/hod/handler"
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
	student.Get("/get-elective-basket-list", studentHandler.GetElectiveBasket)
	student.Get("/get-subgroup-name-list", studentHandler.GetSubgroup)

	// hod routes
	hod := api.Group("/hod")
	hod.Post("/login", hodHandler.LoginHod)
	hod.Post("/create-coordinator", hodHandler.CreateCoordinator)

	//doaa routes
	doaa := api.Group("/doaa")
	doaa.Post("/login", doaaHandler.LoginDoaa)

	//auth routes
	auth := app.Group("/verify")
	auth.Get("/", authHandler.VerifyStudent)

	return app
}
