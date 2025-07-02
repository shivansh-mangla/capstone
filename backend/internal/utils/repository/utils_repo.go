package repository

import (
	"context"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/student/model"
	"go.mongodb.org/mongo-driver/bson"
)

func GetApplicationDetailsByID(applicationId string) (model.Application, error) {
	applicationDetails := database.MongoDB.Collection("applicationDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"application_id": applicationId}

	var application model.Application
	err := applicationDetails.FindOne(ctx, filter).Decode(&application)
	if err != nil {
		return model.Application{}, err
	}
	return application, nil
}