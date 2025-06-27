package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/router"
)

func main() {
	err := godotenv.Load()
	if err != nil{
		log.Fatal("Error loading the .env file")
	}
	PORT := os.Getenv("PORT")
	database.ConnectMongo()

	app := router.SetupRoutes()
	log.Fatal(app.Listen(PORT))
}
