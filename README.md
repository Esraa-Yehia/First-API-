# Courses and Users Management RESTful API

## About
A scalable, production-ready RESTful API built with Node.js, Express.js, and MongoDB Atlas to manage courses and users. The project implements core backend fundamentals including MVC architecture, token-based authentication (JWT), Role-Based Access Control (RBAC), schema validation, and serverless deployment on Vercel.

---

## Live Demo
* Base URL: https://courses-management-api.vercel.app
* Sample Endpoint: https://courses-management-api.vercel.app/api/courses

---

## Key Features
* **Course Administration:** Full CRUD operations with query pagination (`?page=1&limit=10`).
* **Authentication and Authorization:** User registration, password hashing via `bcryptjs`, and stateless token issuance using `JWT`.
* **Role-Based Access Control (RBAC):** Route protection restricted by user roles (`USER`, `MANAGER`, `ADMIN`).
* **Input Validation:** Request payload verification and sanitization using `express-validator`.
* **Centralized Error Handling:** Structured JSON error propagation and standardized API responses.
* **Serverless Architecture:** Dynamic MongoDB connection caching to ensure zero connection timeouts on Vercel cold starts.

---

## Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| Runtime & Framework | Node.js • Express.js | Backend execution environment and HTTP routing framework |
| Database & ODM | MongoDB Atlas • Mongoose | Cloud NoSQL database with schema modeling |
| Security & Auth | JWT • bcryptjs • CORS | Stateless tokens, password hashing, and cross-origin handling |
| File Handling & Validation | Multer • express-validator | Request data validation and multipart file processing |
| Deployment & Hosting | Vercel | Serverless hosting and continuous deployment |

---

## Project Structure

```text
First-API/
├── controllers/      # Route controllers (courses.controll.js, users.controller.js)
├── middlewares/      # RBAC guards, token verification, async wrappers, and validations
├── models/           # Mongoose schemas (course.model.js, user.model.js)
├── routes/           # REST endpoints definition (courses.routes.js, users.route.js)
├── utils/            # Custom error handlers, status texts, and constants
├── uploads/          # Static file storage directory
├── index.js          # Main application entry point & DB connection caching
├── vercel.json       # Serverless function configuration
└── package.json      # Dependencies and scripts
```

---

## API Endpoints

### 1. Courses Endpoints (`/api/courses`)

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | Retrieve all courses (supports pagination) | Public |
| `GET` | `/api/courses/:courseId` | Retrieve single course by ID | Public |
| `POST` | `/api/courses` | Create a new course | ADMIN, MANAGER |
| `PATCH` | `/api/courses/:courseId` | Update course details | Public |
| `DELETE` | `/api/courses/:courseId` | Delete a course | ADMIN, MANAGER |

### 2. Users and Auth Endpoints (`/api/users`)

| Method | Endpoint | Payload Type | Description | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | `multipart/form-data` / JSON | Register a new user | Public |
| `POST` | `/api/users/login` | `application/json` | Authenticate user and receive JWT token | Public |
| `GET` | `/api/users` | `application/json` | Retrieve all registered users | Authenticated (Token Required) |

---

## Data Models

* **Course Schema:**
  * `title`: String (Required)
  * `price`: Number (Required)

* **User Schema:**
  * `firstName`: String (Required)
  * `lastName`: String (Required)
  * `email`: String (Required, Unique)
  * `password`: String (Hashed)
  * `role`: String (Enum: `USER`, `MANAGER`, `ADMIN` — Default: `USER`)
  * `avatar`: String (File Path / Default fallback)
  * `token`: String (JWT token)

---

## Local Setup and Installation

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

## Author
* **Esraa Yehia** — [GitHub Profile](https://github.com/Esraa-Yehia)
*This project represents my first practical backend API project while learning Node.js and Express.*