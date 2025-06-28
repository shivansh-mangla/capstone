package utils

import (
	"fmt"
	"log"
	"os"

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
