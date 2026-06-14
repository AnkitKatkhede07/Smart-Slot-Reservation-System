# Smart Slot Reservation System

## Tech Stack
- React.js
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- Git & GitHub

## Features
- User Registration
- Login Authentication
- Slot Booking
- Slot Cancellation
- Booking History
- Responsive UI
- REST APIs

## Architecture

React Frontend
      ↓
Spring Boot REST APIs
      ↓
H2 Database

Project Structure
Smart-Slot-Reservation-System
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── src/main/java
├── src/main/resources
├── pom.xml
└── README.md

#  Slot Booking System - Spring Boot Project

This is a simple Slot Booking System developed using Spring Boot, Spring Data JPA, and H2 in-memory database.

---

## 🚀 Features

- Create time slots
- View available slots
- Book a slot
- Cancel booking (can be added)
- Uses REST APIs
- In-memory H2 database

---

## 🛠 Technologies Used

- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- H2 Database
- Maven

---

## 📁 Project Structure

com.booking.system  
├── controller  
├── service  
├── repository  
├── entity  
└── BookingSystemApplication.java  

---

## ▶ How to Run the Project

### Using Eclipse

1. Import project as **Maven Project**
2. Right click on `BookingSystemApplication.java`
3. Click **Run As → Spring Boot App**Or **Java Appliaction**
4. Server will start on:  
   `http://localhost:8083`

---

## 🔗 API Endpoints

### ➕ Create Slot

GET (for testing)


# Slot Booking System - Spring Boot

This is a simple slot booking backend project developed using Spring Boot and H2 Database.

## Features
- Create time slots
- View all slots
- Book a slot
- Cancel booking
- REST API based system

## Technologies Used
- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- Maven

## How to Run Project

1. Open project in Eclipse
2. Go to BookingSystemApplication.java
3. Right click → Run As → Spring Boot App
4. Server runs on: http://localhost:8083

## API Endpoints (for Testing)

Create Slot:
http://localhost:8083/slots/create?start=2026-01-28T10:00:00&end=2026-01-28T11:00:00

Get All Slots:
http://localhost:8083/slots

Book Slot:
http://localhost:8083/bookings?slotId=1&userId=101

Cancel Booking:
http://localhost:8083/bookings/cancel?bookingId=1

## Note
This project uses H2 in-memory database, so data will be deleted when server restarts.

## Developed By
Ankit Katkhede
GitHub: https://github.com/AnkitKatkhede07
