# Orthopedic Appointment Web Application (3-Tier)

A full-stack three-tier appointment management web system designed for Orthopedic clinics and doctors.

## Features
- **Patient Registration & Booking**: Collects name, mobile number, specific orthopedic condition, date, time slot, and clinical notes.
- **Double Booking Prevention**: Validates time slot availability in the database.
- **Doctor Portal / Dashboard**: Live appointment status management (`Confirmed`, `Completed`, `Cancelled`).
- **Separated Architecture**: Clear tier separation across Database, Backend API, and Frontend interfaces.

## Getting Started

### 1. Database Setup
Ensure MySQL is running on your machine, then run:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup
1. Open `backend/.env` and update your MySQL password.
2. Install dependencies and start the backend:
```bash
cd backend
npm install
npm start
```

### 3. Access Application
- **Patient Booking Interface:** [http://localhost:5000](http://localhost:5000)
- **Doctor Dashboard:** [http://localhost:5000/admin.html](http://localhost:5000/admin.html)
