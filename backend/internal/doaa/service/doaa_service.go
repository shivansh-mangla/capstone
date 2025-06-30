package service

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/shivansh-mangla/capstone/backend/internal/doaa/model"
	"github.com/shivansh-mangla/capstone/backend/internal/doaa/repository"
	"golang.org/x/crypto/bcrypt"
)

func LoginDoaa(c *fiber.Ctx) error {
	input := new(model.Doaa)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for Doaa Login"})
	}

	doaa, err := repository.GetDoaaDetails()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Some error occured while logging in for Doaa"})
	}

	if doaa.Email != input.Email {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email for Doaa"})
	}

	//compare password
	err = bcrypt.CompareHashAndPassword([]byte(doaa.Password), []byte(input.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid password for Doaa"})
	}

	//generating JWT token
	claims := jwt.MapClaims{
		"email": input.Email,
		"role":  "doaa",
		"exp":   time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	JWT_KEY := os.Getenv("JWT_KEY")
	fmt.Println(token)
	tokenString, err := token.SignedString([]byte(JWT_KEY))

	if err != nil {
		fmt.Print(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not create JWT token for Doaa"})
	}

	return c.Status(fiber.StatusFound).JSON(fiber.Map{"token": tokenString, "doaaData": doaa})
}

func UpdateDoaaName(c *fiber.Ctx) error {
	input := new(model.Doaa)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for Doaa name Update"})
	}

	err := repository.UpdateDoaaName(input)
	if err != nil {
		return err
	}
	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"Status": "Doaa name updated"})
}

func UpdateDoaaPassword(c *fiber.Ctx) error {
	input := new(model.PasswordUpdation)

	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON for Doaa password Update"})
	}

	doaa, err := repository.GetDoaaDetails()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Some error occured while password updation for Doaa"})
	}

	//compare password
	err = bcrypt.CompareHashAndPassword([]byte(doaa.Password), []byte(input.OldPassword))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid password for Doaa"})
	}

	err = repository.SetDoaaPassword(input.NewPassword)
	if err != nil {
		return err
	}
	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"Status": "Doaa password updated"})
}
