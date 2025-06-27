package main

import "github.com/gofiber/fiber/v2"

func main() {
	err := godotenv.Load()
	app := fiber.New()

	app.Listen(PORT)
}
