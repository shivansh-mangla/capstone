package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/router"
	studentHandler "github.com/shivansh-mangla/capstone/backend/internal/student/handler"
)

var electiveBasketList []string
var subgroupList []string

func main() {
	err := godotenv.Load()
	if err != nil{
		log.Fatal("Error loading the .env file")
	}
	PORT := os.Getenv("PORT")
	database.ConnectMongo()

	electiveBasketList, err = studentHandler.GetElectiveBasket()
	if(err != nil){
		log.Fatal("Elective basket list not retrieved from database")
	}
	subgroupList, err = studentHandler.GetSubgroup()
	if(err != nil){
		log.Fatal("Subgroup list not retrieved from database")
	}


	fmt.Println(electiveBasketList)
	fmt.Println(subgroupList)
	
	app := router.SetupRoutes()

	log.Fatal(app.Listen(PORT))
}
