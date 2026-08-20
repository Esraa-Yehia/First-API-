# Courses & Users Management — RESTful API

<<<<<<< HEAD
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
| **Environment & Tools** | `dotenv` • `Nodemon` • `Postman` | Environment configuration, auto-reloading dev server, and API testing |

---

## Key Features
* **Architecture:** Clean MVC pattern • Centralized Global Error Handling • Custom `asyncWrapper`.
* **API Standardization:** JSend specification (`status`, `data`, `message`, `code`) • Dynamic Pagination (`page`, `limit`).
* **Security:** Password hashing • Protected routes via `verifyToken` • Role-based access via `allowTo`.
* **Media Handling:** Image upload validation with Multer • Static serving for `/uploads`.

---

## Project Structure
```text
First-API-/
├── controllers/       # courses.controll.js • users.controller.js
├── middlewares/       # allowTo.js • asyncWrapper.js • validationSchema.js • verifyToken.js
├── models/            # course.model.js • user.model.js
├── routes/            # courses.routes.js • users.route.js
├── utils/             # appError.js • generateJWT.js • httpStatusText.js • userRoles.js
├── uploads/           # Static user avatars
├── index.js           # App entry point
└── package.json
API Endpoints1. Courses Endpoints (/api/courses)MethodEndpointDescriptionAccess / RolesGET/api/coursesGet all courses (supports ?page=1&limit=10)PublicGET/api/courses/:courseIdGet single course by IDPublicPOST/api/coursesCreate a new course🔒 MANGERPATCH/api/courses/:courseIdUpdate course detailsPublicDELETE/api/courses/:courseIdDelete a course🔒 ADMIN, MANGER2. Users & Auth Endpoints (/api/users)MethodEndpointPayload TypeAccess / RolesGET/api/usersJSON (supports ?page=1&limit=10)🔒 AuthenticatedPOST/api/users/registermultipart/form-data (avatar support)PublicPOST/api/users/loginJSON (email, password)PublicData Models SummaryCourse: title (String, Required) • price (Number, Required)User: firstName (String) • lastName (String) • email (String, Unique) • password (Hashed) • role (USER | MANGER | ADMIN) • avatar (File Path)Installation & SetupClone the repository:Bashgit clone [https://github.com/Esraa-Yehia/First-API-.git](https://github.com/Esraa-Yehia/First-API-.git)
cd First-API-
Install dependencies:Bashnpm install
Configure Environment Variables:Create a .env file in the root directory:مقتطف الرمزPORT=4000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
Run the server:Bash# Development mode
npm run run:dev

# Production mode
npm start
Author Esraa Yehia — https://github.com/Esraa-Yehia

This project represents my first practical backend API project whilelearning Node.js and Express.

