package main

import (
    "github.com/golang-jwt/jwt/v4"
    "github.com/gin-gonic/gin"
    "net/http"
    "time"
)

type User struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

var jwtKey = []byte("your_secret_key")

type Claims struct {
    Email string `json:"email"`
    jwt.StandardClaims
}

func main() {
    initDB()
    router := gin.Default()

    router.POST("/login", func(c *gin.Context) {
        var req User
        if err := c.BindJSON(&req); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
            return
        }

        var user User
        err := db.Get(&user, "SELECT email, password FROM users WHERE email=$1", req.Email)
        if err != nil || user.Password != req.Password {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
            return
        }

        // Create JWT token
        expirationTime := time.Now().Add(24 * time.Hour)
        claims := &Claims{
            Email: req.Email,
            StandardClaims: jwt.StandardClaims{
                ExpiresAt: expirationTime.Unix(),
            },
        }
        token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
        tokenString, err := token.SignedString(jwtKey)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"token": tokenString})
    })

    router.Run(":8080")
}

