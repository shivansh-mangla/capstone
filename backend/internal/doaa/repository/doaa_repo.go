package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/doaa/model"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func GetDoaaDetails() (model.Doaa, error) {
    doaaDetails := database.MongoDB.Collection("doaaDetails")
   
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
   
    var doaa model.Doaa
    
    err := doaaDetails.FindOne(ctx, bson.M{}).Decode(&doaa)
    if err != nil {
        fmt.Println(err)
        return model.Doaa{}, err
    }
    return doaa, nil
}

func SetDoaaPassword(password string) error {
    doaaDetails := database.MongoDB.Collection("doaaDetails")
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
    if err != nil {
        return fmt.Errorf("Failed to generate hash for password: %v", err)
    }
    
    filter := bson.M{} 
    update := bson.M{"$set": bson.M{"doaa_password": string(hash)}}
    
    result, err := doaaDetails.UpdateOne(ctx, filter, update)
    if err != nil {
        return fmt.Errorf("failed to update password: %v", err)
    }
    
    if result.MatchedCount == 0 {
        return fmt.Errorf("no doaa document found to update")
    }
    
    return nil
}