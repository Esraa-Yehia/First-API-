
First API 
A RESTful backend API built with Node.js, Express, MongoDB, and Mongoose.

This project was built as my first backend project while learning Node.js and Express. It covers the fundamentals of building a real-world API: routing, controllers, middleware, validation, authentication, authorization, file uploads, database integration, error handling, and CRUD operations.

📌 Project Overview
The API provides two main resources:

Courses — create, read, update, and delete courses.

Users — register users, upload profile images, log in, and retrieve users.

The application uses MongoDB Atlas as the database and Mongoose as the ODM.

Main request flow
Client / Postman
       │
       ▼
   HTTP Request
       │
       ▼
    Express
       │
       ├── Middleware
       │     ├── CORS
       │     ├── JSON parsing
       │     ├── Authentication
       │     ├── Authorization
       │     ├── Validation
       │     └── File upload
       │
       ▼
     Routes
       │
       ▼
   Controllers
       │
       ▼
    Mongoose
       │
       ▼
 MongoDB Atlas
       │
       ▼
   HTTP Response


✨ Features
RESTful API endpoints

Course CRUD operations

User registration and login

Password hashing using bcryptjs

JWT-based authentication

Role-based authorization

Request validation using express-validator

Image upload using multer

Static file serving for uploaded images

Pagination using page and limit

CORS support

Centralized error handling

404 handling for unavailable routes

MongoDB Atlas integration through Mongoose

Environment variables using dotenv

Development workflow with Nodemon

🛠️ Tech Stack
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Web framework for building the API
MongoDB Atlas	Cloud database
Mongoose	ODM for MongoDB
JWT	Authentication
bcryptjs	Password hashing
Multer	Image/file uploads
express-validator	Request validation
CORS	Cross-origin request handling
dotenv	Environment variable management
Nodemon	Development auto-restart
Postman	API testing
📁 Project Structure
First-API-/
│
├── controllers/
│   ├── courses.controll.js
│   └── users.controller.js
│
├── data/
│
├── middlewares/
│   ├── allowTo.js
│   ├── asyncWrapper.js
│   ├── validationSchema.js
│   └── verifyToken.js
│
├── models/
│   ├── course.model.js
│   └── user.model.js
│
├── routes/
│   ├── courses.routes.js
│   └── users.route.js
│
├── uploads/
│
├── utils/
│   ├── appError.js
│   ├── generateJWT.js
│   ├── httpStatusText.js
│   └── userRoles.js
│
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
🗄️ Data Models
Course
A course contains:

{
  "title": "Node.js",
  "price": 500
}
Fields:

title — required string

price — required number

User
A user contains:

{
  "firstName": "Esraa",
  "lastName": "Yehia",
  "email": "example@email.com",
  "password": "hashed-password",
  "role": "USER",
  "avatar": "uploads/profile.png"
}
Roles currently supported:

USER

MANGER

ADMIN

MANGER is intentionally kept as written in the current project implementation.

🔐 Authentication
Authentication is implemented using JSON Web Tokens (JWT).

After a successful login, the API returns a token.

Protected requests should include the token in the Authorization header:

Authorization: Bearer <TOKEN>
The verifyToken middleware:

Reads the Authorization header.

Extracts the token.

Verifies it using JWT_SECRET_KEY.

Adds the authenticated user information to req.currentUser.

Allows the request to continue.

JWT expiration is currently configured to 2 minutes in the project.

👮 Authorization
Authentication answers:

"Who are you?"

Authorization answers:

"Are you allowed to perform this action?"

The project uses the allowTo middleware for role-based authorization.

Current course permissions:

Endpoint	Access
Get all courses	Public
Get a single course	Public
Create a course	Authenticated MANGER
Update a course	Public in the current implementation
Delete a course	Authenticated ADMIN or MANGER
User listing requires authentication.

📚 API Endpoints
Base URL:

http://localhost:4000
After deployment, replace the base URL with the deployed API URL.

Courses
Get All Courses
GET /api/courses
Optional pagination:

GET /api/courses?page=1&limit=10
Query Parameters
Parameter	Description	Default
page	Page number	1
limit	Number of courses per page	10
Get Single Course
GET /api/courses/:courseId
Example:

GET /api/courses/64abc123...
Returns the requested course if it exists.

Create Course
POST /api/courses
Authorization
Requires:

Authorization: Bearer <TOKEN>
The authenticated user must have the MANGER role.

Body
{
  "title": "Node.js",
  "price": 500
}
Both title and price are validated before the course is created.

Update Course
PATCH /api/courses/:courseId
Example body:

{
  "price": 700
}
Delete Course
DELETE /api/courses/:courseId
Authorization
Requires:

Authorization: Bearer <TOKEN>
Allowed roles:

ADMIN

MANGER

Users
Get All Users
GET /api/users
Authorization
Requires:

Authorization: Bearer <TOKEN>
Optional pagination:

GET /api/users?page=1&limit=10
Passwords are excluded from the returned user data.

Register
POST /api/users/register
This endpoint uses multipart/form-data because it supports an avatar image upload.

Form fields
Field	Type	Required
firstName	Text	Yes
lastName	Text	Yes
email	Text	Yes
password	Text	Yes
role	Text	No
avatar	File	No
The avatar must be an image.

Uploaded files are stored in the uploads/ directory.

Login
POST /api/users/login
JSON body
{
  "email": "example@email.com",
  "password": "your-password"
}
On successful login, the API returns a JWT token.

Use that token to access protected endpoints.

🖼️ Uploaded Images
Uploaded images are stored inside:

/uploads
The application exposes this directory as static content:

/uploads/<filename>
This allows uploaded images to be requested through HTTP.

⚠️ Error Handling
The API uses centralized error handling.

Example error response:

{
  "status": "error",
  "message": "this resource is not available",
  "code": 404,
  "data": null
}
Common status codes:

Code	Meaning
200	Request succeeded
201	Resource created
400	Bad request
401	Unauthorized
404	Resource not found
500	Internal server error

🔧 Environment Variables
The application uses environment variables for sensitive configuration.

Create a local .env file:

PORT=4000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret
Important
Never commit .env to GitHub.

The MongoDB connection string and JWT secret are sensitive credentials.

For deployment, configure these values as environment variables on the hosting platform instead of putting them directly in the source code.

🚀 Running Locally
1. Clone the repository
git clone https://github.com/Esraa-Yehia/First-API-.git
cd First-API-
2. Install dependencies
npm install
3. Create .env
Add the required environment variables:

PORT=4000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret
4. Start the development server
npm run run:dev
The server should start on:

http://localhost:4000
🧪 Testing the API
The API was tested using Postman.

The main request groups are:

Courses

Get Courses

Get Single Course

Create Course

Edit Course

Delete Course

Users

Get All Users

Register

Login

☁️ Deployment
This API can be deployed as a Node.js Web Service on platforms such as Render.

The deployed URL will be added here after deployment:

Live API: <DEPLOYED_API_URL>
Production environment variables
Configure:

MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=<provided-by-platform>
The application already uses:

const port = process.env.PORT || 4000;
so it can use the hosting platform's assigned port.

MongoDB Atlas
When deploying, the production server must also be allowed to connect to the MongoDB Atlas cluster through the Atlas IP Access List.



GitHub:
https://github.com/Esraa-Yehia

⭐ This project represents my first practical backend API project while learning Node.js and Express.

