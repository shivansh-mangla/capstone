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

func CheckStudentExistence(email string) (bool, error) {
	studentDetails = database.MongoDB.Collection("studentDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"thapar_email": email}
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
		Subgroup string   `bson:"subgroup" json:"subgroup"`
		Data     []bson.M `bson:"data" json:"data"`
	}

	filter := bson.M{"subgroup": subgroup}

	var timeTable TimeTable
	err := subgroupDetails.FindOne(ctx, filter).Decode(&timeTable)
	if err != nil {
		fmt.Println("Subgroup not found:", err)
	}

	return timeTable, nil
}

func ElectiveBasketFromDB() (model.ElectiveBasket, error) {
	electiveBasketList := database.MongoDB.Collection("electiveBasketList")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var basket model.ElectiveBasket
	err := electiveBasketList.FindOne(ctx, bson.M{}).Decode(&basket)
	if err != nil {
		return model.ElectiveBasket{}, err
	}

	return basket, nil

}
func SubgroupFromDB() (model.Subgroup, error) {
	subgroupNames := database.MongoDB.Collection("subgroupNames")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var subgroupList model.Subgroup
	err := subgroupNames.FindOne(ctx, bson.M{}).Decode(&subgroupList)
	if err != nil {
		return model.Subgroup{}, err
	}

	return subgroupList, nil

}

func UpdateDetailsDB(student *model.Student) error {
	studentDetails = database.MongoDB.Collection("studentDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"thapar_email": student.ThaparEmail}
	update := bson.M{"$set": student}

	result, err := studentDetails.UpdateOne(ctx, filter, update)
	if err != nil {
		return fmt.Errorf("failed to update student details: %v", err)
	}

	if result.MatchedCount == 0 {
		return fmt.Errorf("no student found with email: %s", student.ThaparEmail)
	}

	return nil
}

func GetElectiveData() (bson.M, error) {
	electiveDetails := database.MongoDB.Collection("electiveDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	data := bson.M{}

	err := electiveDetails.FindOne(ctx, bson.M{}).Decode(&data)
	if err != nil {
		return bson.M{}, err
	}
	return data, err
}
