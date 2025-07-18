package service

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gofiber/fiber/v2"
	"github.com/shivansh-mangla/capstone/backend/internal/database"
	"github.com/shivansh-mangla/capstone/backend/internal/utils/repository"
	"gopkg.in/mail.v2"
)

func SendVerificationEmail(recipientEmail, token string) error {
	from := os.Getenv("EMAIL_FROM")
	password := os.Getenv("EMAIL_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := 587

	// Create message
	m := mail.NewMessage()
	m.SetHeader("From", m.FormatAddress(from, "Improvement Portal Server"))
	m.SetHeader("To", recipientEmail)
	m.SetHeader("Subject", "Verify your email for Improvement Portal")
	verificationLink := fmt.Sprintf("http://localhost:5000/verify?token=%s", token)
	m.SetBody("text/html", fmt.Sprintf(`
		<h2>Email Verification</h2>
		<p>Click the link below to verify your email and then login:</p>
		<a href="%s">Verify Email</a>
	`, verificationLink))

	// Set up dialer
	d := mail.NewDialer(smtpHost, smtpPort, from, password)

	// Send email
	if err := d.DialAndSend(m); err != nil {
		log.Println("Failed to send email:", err)
		return err
	}

	fmt.Println("Verification email sent to:", recipientEmail)
	return nil
}

func UploadToCloudinary(file multipart.File, filename string) (string, error) {
	cloudName := os.Getenv("CLOUDINARY_URL")

	cld, err := cloudinary.NewFromURL(cloudName)
	if err != nil {
		return "", err
	}

	ctx := context.Background()

	uploadResult, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{
		PublicID:       filename,
		ResourceType:   "raw", // important for PDFs
		Folder:         "receipts",
		UseFilename:    true,
		UniqueFilename: false,
		Overwrite:      true,
	})

	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return uploadResult.SecureURL, nil
}

func UploadToCloudinary2(file io.Reader, filename string) (string, error) {
	CLOUDINARY_API_KEY := os.Getenv("CLOUDINARY_API_KEY")
	CLOUDINARY_API_SECRET := os.Getenv("CLOUDINARY_API_SECRET")
	CLOUDINARY_CLOUD := os.Getenv("CLOUDINARY_CLOUD")

	cld, err := cloudinary.NewFromParams(CLOUDINARY_CLOUD, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
	if err != nil {
		return "", err
	}

	uploadRes, err := cld.Upload.Upload(context.Background(), file, uploader.UploadParams{
		PublicID:     filename,
		ResourceType: "auto",
		Folder:       "fee_receipts",
	})
	if err != nil {
		return "", err
	}

	return uploadRes.SecureURL, nil
}

func GetCourseList(c *fiber.Ctx) error {
	return c.JSON(database.GetCourseList())
}

func GetApplicationDetails(c *fiber.Ctx) error {
	var input struct {
		ApplicationId string `json:"application_id" bson:"application_id"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if input.ApplicationId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required field: application_id"})
	}

	application, err := repository.GetApplicationDetailsByID(input.ApplicationId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"Application Data": application})
}

func RejectApplicationById(c *fiber.Ctx) error {
	var input struct {
		ApplicationId string `json:"application_id" bson:"application_id"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if input.ApplicationId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required field: application_id"})
	}

	err := repository.RejectApplicationById(input.ApplicationId)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(200).JSON(fiber.Map{"Status": "Application successfully rejected", "application_id": input.ApplicationId})
}

func GetApplicationStatusById(c *fiber.Ctx) error {
	var input struct {
		ApplicationId string `json:"application_id" bson:"application_id"`
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if input.ApplicationId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required field: application_id"})
	}

	status, err := repository.GetApplicationStatusByID(input.ApplicationId)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(200).JSON(fiber.Map{"Status": status})
}

func GetAllApplications(c *fiber.Ctx) error {
	allApplications, err := repository.GetAllApplicationsinDB()
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"Error": err})
	}
	return c.Status(200).JSON(fiber.Map{"data": allApplications})
}
