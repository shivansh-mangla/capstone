package repository

import (
	"context"
	"fmt"
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

func RejectApplicationById(id string) error {
	applicationDetails := database.MongoDB.Collection("applicationDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"application_id": id}  
    update := bson.M{"$set": bson.M{"stage": 10}}

    result, err := applicationDetails.UpdateOne(ctx, filter, update)
    if err != nil {
        return fmt.Errorf("failed to update application: %v", err)
    }

    if result.MatchedCount == 0 {
        return fmt.Errorf("no application found with id: %s", id)
    }

    return nil
}