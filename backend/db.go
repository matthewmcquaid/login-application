package main

import (
    "fmt"
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
)

var db *sqlx.DB

func initDB() {
    dsn := "user=postgres password=yourpassword dbname=login sslmode=disable"
    var err error
    db, err = sqlx.Connect("postgres", dsn)
    if err != nil {
        panic(fmt.Sprintf("Failed to connect to DB: %v", err))
    }
}