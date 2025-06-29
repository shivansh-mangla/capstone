package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/student/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var studentDetails *mongo.Collection
var subgroupDetails *mongo.Collection

func CreateStudentDB(s *model.Student) error {
	studentDetails = database.MongoDB.Collection("studentDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := studentDetails.InsertOne(ctx, s)
	fmt.Println("Data addedddddddddddd")
	return err
}

func CheckStudentExistence(rollNo string) (bool, error) {
	studentDetails = database.MongoDB.Collection("studentDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"roll_no": rollNo}
	var result bson.M

	err := studentDetails.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil // Student does not exist
		}
		return false, err // Some other error occurred
	}

	return true, nil // Student exists
}

func GetStudentByEmail(email string) (model.Student, error) {
	studentDetails = database.MongoDB.Collection("studentDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"thapar_email": email}

	var student model.Student
	err := studentDetails.FindOne(ctx, filter).Decode(&student)
	if err != nil {
		return model.Student{}, err // Some error occurred
	}

	return student, nil
}

func GetTimeTableData(subgroup string) (interface{}, error) {
	subgroupDetails = database.MongoDB.Collection("timeTableData2")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	type TimeTable struct {
		Subgroup string      `bson:"subgroup"`
		Data     interface{} `bson:"data"`
	}

	filter := bson.M{"subgroup": subgroup}

	var timeTable TimeTable
	err := subgroupDetails.FindOne(ctx, filter).Decode(&timeTable)
	if err != nil {
		fmt.Println("Subgroup not found:", err)
	}

	return timeTable, nil
}
