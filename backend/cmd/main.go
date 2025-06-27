package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
)

func main() {
	err := godotenv.Load()
	if err != nil{
		log.Fatal("Error loading the .env file")
	}
	PORT := os.Getenv("PORT")
	database.ConnectMongo()
	
	app := fiber.New()
	log.Fatal(app.Listen(PORT))
}
