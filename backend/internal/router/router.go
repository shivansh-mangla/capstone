package router

import "github.com/gofiber/fiber/v2"

func SetupRoutes() *fiber.App {
	app := fiber.New()
	api := app.Group("/api")

	// student routes
	student := api.Group("/student")

	// hod routes
	hod := api.Group("/hod")

	return app
}
