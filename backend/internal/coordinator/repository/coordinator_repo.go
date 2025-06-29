package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/coordinator/model"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
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

func SetCoordinatorPassword(email string, password string) error {
	coordinatorDetails := database.MongoDB.Collection("coordinatorDetails")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
    if err != nil {
        return fmt.Errorf("Failed to generate hash for password: %v", err)
    }
    
	filter := bson.M{"email": email}
    update := bson.M{"$set": bson.M{"password": string(hash)}}
    
    result, err := coordinatorDetails.UpdateOne(ctx, filter, update)
    if err != nil {
        return fmt.Errorf("failed to update password for coordinator: %v", err)
    }
    
    if result.MatchedCount == 0 {
        return fmt.Errorf("no coordinator document found to update")
    }
    
    return nil
}