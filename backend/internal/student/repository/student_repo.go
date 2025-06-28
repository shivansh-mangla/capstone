package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/student/model"
	"go.mongodb.org/mongo-driver/mongo"
)

var studentDetails *mongo.Collection = database.MongoDB.Collection("studentDetails")

func CreateStudentDB(s *model.Student) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := studentDetails.InsertOne(ctx, s)
	fmt.Println("data added success")
	return err
}
