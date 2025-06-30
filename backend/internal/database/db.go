package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var MongoDB *mongo.Database
var courseListCollection *mongo.Collection
var courseList []bson.M
var flag bool = false

func ConnectMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		log.Fatal("MongoDB Connection Error:", err)
	}
	fmt.Println("Mongo DB connection successful")

	MongoClient = client
	MongoDB = client.Database(os.Getenv("MONGO_DB"))
}

func GetCourseList() []bson.M {
	if flag {
		return courseList
	}
	courseListCollection = MongoDB.Collection("courseList")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{}

	cursor, _ := courseListCollection.Find(ctx, filter)
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &courseList); err != nil {
		fmt.Println("error decoding documents: %w", err)
	}
	flag = true
	return courseList
}
