package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-mail/mail"
	"github.com/joho/godotenv"
)

// ContactForm mewakili struktur data dari formulir kontak
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// Middleware untuk menangani CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Mengizinkan asal spesifik (domain frontend Anda)
		// PASTIKAN INI SESUAI DENGAN PORT NEXT.JS ANDA, BIASANYA 3000
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle permintaan preflight CORS (permintaan OPTIONS)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Lanjutkan ke handler berikutnya (contactHandler)
		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Error loading .env file: %v. Continuing without .env variables.", err)
	}

	// Buat router (ServeMux) baru
	mux := http.NewServeMux()
	mux.HandleFunc("/api/contact", contactHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("SMTP_HOST: %s", os.Getenv("SMTP_HOST"))
	log.Printf("SMTP_USER: %s", os.Getenv("SMTP_USER"))
	log.Printf("Server dimulai di :%s", port)

	// Terapkan middleware CORS ke mux sebelum melayani HTTP
	log.Fatal(http.ListenAndServe(":"+port, enableCORS(mux))) // <--- PERHATIKAN BAGIAN INI
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	// ... (kode ini tetap sama dari sebelumnya) ...
	if r.Method != http.MethodPost {
		http.Error(w, "Metode tidak diizinkan", http.StatusMethodNotAllowed)
		return
	}

	var formData ContactForm
	err := json.NewDecoder(r.Body).Decode(&formData)
	if err != nil {
		http.Error(w, "Payload JSON tidak valid", http.StatusBadRequest)
		return
	}

	if formData.Name == "" || formData.Email == "" || formData.Message == "" {
		http.Error(w, "Semua kolom harus diisi", http.StatusBadRequest)
		return
	}

	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASSWORD")

	if smtpHost == "" || smtpPort == "" || smtpUser == "" || smtpPass == "" {
		log.Println("Variabel lingkungan SMTP belum diatur. Pengiriman email dinonaktifkan.")
		http.Error(w, "Konfigurasi server email belum lengkap.", http.StatusInternalServerError)
		return
	}

	m := mail.NewMessage()
	m.SetHeader("From", formData.Email)
	m.SetHeader("To", smtpUser)
	m.SetHeader("Subject", "Pesan Baru dari Portofolio: "+formData.Name)
	m.SetBody("text/plain", fmt.Sprintf(
		"Nama: %s\nEmail: %s\nPesan:\n%s",
		formData.Name,
		formData.Email,
		formData.Message,
	))

	d := mail.NewDialer(smtpHost, 587, smtpUser, smtpPass)
	if err := d.DialAndSend(m); err != nil {
		log.Printf("Gagal mengirim email: %v", err) // <--- LOG INI AKAN SANGAT PENTING JIKA ADA ERROR EMAIL
		http.Error(w, "Gagal mengirim email.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Pesan berhasil terkirim!"})
}