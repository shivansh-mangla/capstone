package repository

import (
	"context"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/coordinator/model"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"go.mongodb.org/mongo-driver/bson"
)

func GetCoordinatorDetailsByEmail(email string) (model.Coordinator, error) {
	coordinatorDetails := database.MongoDB.Collection("coordinatorDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	var coordinator model.Coordinator
	filter := bson.M{"email": email}

	err := coordinatorDetails.FindOne(ctx, filter).Decode(&coordinator)
	if err != nil {
		return model.Coordinator{}, err
	}

	return coordinator, nil
}