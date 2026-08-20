# Courses & Users Management — RESTful API

## About
This is my first practical backend API project built completely from scratch while learning Node.js and Express.js. The goal was to understand how a real-world backend API is structured, implementing core concepts like routing, MVC architecture, authentication, role-based authorization, request validation, and database integration.

---

## Project Overview
This project provides a full backend service managing two primary resources:
* **Courses:** Full CRUD operations with query pagination.
* **Users & Auth:** Secure registration, avatar uploads, login, and token generation.
* **Security & Roles:** Role-based access control (`USER`, `MANGER`, `ADMIN`) using JWT and password hashing.

---

## Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Runtime & Framework** | `Node.js` • `Express.js` | JavaScript backend runtime and web application framework |
| **Database & ODM** | `MongoDB Atlas` • `Mongoose` | Cloud NoSQL database and Object Data Modeling library |
| **Authentication & Security** | `JWT` • `bcryptjs` • `CORS` | Token-based auth, secure password hashing, and cross-origin handling |
| **File Handling & Validation** | `Multer` • `express-validator` | Multipart image uploads and incoming request data validation |

---

## Project Structure

```text
First-API/
├── controllers/      # courses.controll.js • users.controller.js
├── middlewares/      # allowTo.js • asyncWrapper.js • validationSchema.js • verifyToken.js
├── models/           # course.model.js • user.model.js
├── routes/           # courses.routes.js • users.route.js
├── utils/            # appError.js • generateJWT.js • httpStatusText.js • userRoles.js
├── uploads/          # Static user avatars
├── index.js          # App entry point
└── package.json
```

---

## API Endpoints

### 1. Courses Endpoints (`/api/courses`)

| Method | Endpoint | Description | Access / Roles |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | Get all courses (supports `?page=1&limit=10`) | Public |
| `GET` | `/api/courses/:courseId` | Get single course by ID | Public |
| `POST` | `/api/courses` | Create a new course | 🔒 `MANAGER`, `ADMIN` |
| `PATCH` | `/api/courses/:courseId` | Update course details | Public |
| `DELETE` | `/api/courses/:courseId` | Delete a course | 🔒 `ADMIN`, `MANAGER` |

### 2. Users & Auth Endpoints (`/api/users`)

| Method | Endpoint | Payload Type | Description | Access / Roles |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | JSON | Get all users (supports `?page=1&limit=10`) | 🔒 Authenticated |
| `POST` | `/api/users/register` | `multipart/form-data` | Register new user (avatar support) | Public |
| `POST` | `/api/users/login` | JSON | Login with `email` and `password` | Public |

---

## Data Models Summary

* **Course:** `title` (String, Required) • `price` (Number, Required)
* **User:** `firstName` (String) • `lastName` (String) • `email` (String, Unique) • `password` (Hashed) • `role` (`USER` | `MANGER` | `ADMIN`) • `avatar` (File Path)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Esraa-Yehia/First-API-.git](https://github.com/Esraa-Yehia/First-API-.git)
   cd First-API-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   MONGO_URL=your_mongodb_atlas_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

4. **Run the server:**
   * Development mode:
     ```bash
     npm run dev
     ```
   * Production mode:
     ```bash
     npm start
     ```

---

**Author:** [Esraa Yehia](https://github.com/Esraa-Yehia)  
*This project represents my first practical backend API project while learning Node.js and Express.*