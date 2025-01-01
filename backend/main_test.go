package main

import (
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"
    "github.com/gin-gonic/gin"
)

func TestLogin(t *testing.T) {
    initDB()
    router := setupRouter()

    reqBody := `{"email":"test@test.com", "password":"password123"}`
    req := httptest.NewRequest("POST", "/login", strings.NewReader(reqBody))
    req.Header.Set("Content-Type", "application/json")
    w := httptest.NewRecorder()

    router.ServeHTTP(w, req)

    if w.Code != http.StatusOK {
    }
    
}

func setupRouter() *gin.Engine {
    router := gin.Default()
    router.POST("/login", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "login successful"})
    })
    return router
}