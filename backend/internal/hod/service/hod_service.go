package service

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/shivansh-mangla/capstone/backend/internal/hod/model"
	"github.com/shivansh-mangla/capstone/backend/internal/hod/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func LoginHod(c *fiber.Ctx) error {
	input := new(model.Hod)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for Hod Login"})
	}

	hod, err := repository.GetHodDetailsByEmail(input.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments{
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "HOD doesnt exist by this email"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Some error occured while logging in for Hod"})
	}

	//compare password
	err = bcrypt.CompareHashAndPassword([]byte(hod.Password), []byte(input.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid password for Hod"})
	}

	//generating JWT token
	claims := jwt.MapClaims{
		"email": input.Email,
		"exp":   time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	JWT_KEY := os.Getenv("JWT_KEY")
	tokenString, err := token.SignedString([]byte(JWT_KEY))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not create JWT token for Hod"})
	}

	return c.Status(fiber.StatusFound).JSON(fiber.Map{"token": tokenString, "hodData": hod})
}

