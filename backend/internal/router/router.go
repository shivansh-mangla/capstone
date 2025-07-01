package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	authHandler "github.com/shivansh-mangla/capstone/backend/internal/auth/handler"
	coordinatorHandler "github.com/shivansh-mangla/capstone/backend/internal/coordinator/handler"
	doaaHandler "github.com/shivansh-mangla/capstone/backend/internal/doaa/handler"
	hodHandler "github.com/shivansh-mangla/capstone/backend/internal/hod/handler"
	studentHandler "github.com/shivansh-mangla/capstone/backend/internal/student/handler"
	"github.com/shivansh-mangla/capstone/backend/internal/utils"
)

func SetupRoutes() *fiber.App {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowCredentials: true,
	}))

	api := app.Group("/api")

	// student routes
	student := api.Group("/student")
	student.Post("/register", studentHandler.RegisterStudent)
	student.Post("/login", studentHandler.LoginStudent)
	student.Get("/gettimetable", studentHandler.GenerateTimeTable)
	student.Get("/get-elective-basket-list", studentHandler.GetElectiveBasket)
	student.Get("/get-subgroup-name-list", studentHandler.GetSubgroup)
	student.Post("/upload-fee", authHandler.JWTMiddleware, studentHandler.UploadFeeReciept)
	student.Post("/update-details", authHandler.JWTMiddleware, studentHandler.UpdateDetails)
	student.Get("/get-elective-data", studentHandler.GetElectiveData)
	student.Post("/generate-application",  studentHandler.CreateApplication)

	// hod routes
	hod := api.Group("/hod")
	hod.Post("/login", hodHandler.LoginHod)
	hod.Post("/create-coordinator", hodHandler.CreateCoordinator)
	hod.Post("/update-name", hodHandler.UpdateHodName)
	hod.Post("/update-password", hodHandler.UpdateHodPassword)
	hod.Get("/all-coordinators-details", hodHandler.GetAllCoordinatorsDetails)
	hod.Post("/delete-coordinator", hodHandler.DeleteCoordinator)

	//coordinator routes
	coordinator := api.Group("/coordinator")
	coordinator.Post("/login", coordinatorHandler.LoginCoordinator)
	coordinator.Post("/update-password", coordinatorHandler.UpdateCoordinatorPassword)

	//doaa routes
	doaa := api.Group("/doaa")
	doaa.Post("/login", doaaHandler.LoginDoaa)
	doaa.Post("/update-name", doaaHandler.UpdateDoaaName)
	doaa.Post("/update-password", doaaHandler.UpdateDoaaPassword)
	doaa.Get("/all-coordinators-details", doaaHandler.GetAllCoordinatorsDetails)

	//auth routes
	auth := app.Group("/verify")
	auth.Get("/", authHandler.VerifyStudent)

	//util routes
	api.Get("/get-course-list", utils.GetCourseList)

	return app
}
