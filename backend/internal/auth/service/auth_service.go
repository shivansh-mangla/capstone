package service

import (
	"context"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"go.mongodb.org/mongo-driver/bson"
)

func VerifyStudent(c *fiber.Ctx) error {
	tokenString := c.Query("token")

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_KEY")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid or expired token")
	}

	claims := token.Claims.(jwt.MapClaims)
	email := claims["email"].(string)

	// Update user to set verified = true
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"thapar_email": email}
	update := bson.M{"$set": bson.M{"verified": true}}

	_, err = database.MongoDB.Collection("studentDetails").UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(500).SendString("Failed to verify email")
	}

	return c.SendString("Email verified successfully!")
}
