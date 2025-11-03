package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/router"
	studentHandler "github.com/shivansh-mangla/capstone/backend/internal/student/handler"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using Render environment variables")
	}

	PORT := os.Getenv("PORT")
	database.ConnectMongo()
	database.GetCourseList()

	err = studentHandler.RetrieveElectiveBasket()
	if err != nil {
		log.Fatal("Elective basket list not retrieved from database")
	}
	err = studentHandler.RetrieveSubgroup()
	if err != nil {
		log.Fatal("Subgroup list not retrieved from database")
	}

	app := router.SetupRoutes()

	log.Fatal(app.Listen(PORT))
}
