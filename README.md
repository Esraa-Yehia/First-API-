
First API

A RESTful backend API built with Node.js, Express.js, MongoDB, andMongoose.

This is my first practical backend project. It was built while learningNode.js and Express, with a focus on understanding how a real backendAPI is structured and how its main components work together.

Overview

The API provides two main resources:

Resource      Main Operations

Courses   Create, read, update, deleteUsers     Register, login, retrieve users, upload profile images

The application uses MongoDB Atlas as the database and Mongooseas the ODM.

Request Flow

Client / Postman
       │
       ▼
  HTTP Request
       │
       ▼
    Express
       │
       ├── Middleware
       │   ├── CORS
       │   ├── JSON Parsing
       │   ├── Authentication
       │   ├── Authorization
       │   ├── Validation
       │   └── File Upload
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

Features

Category                            Features

API                                 RESTful API, routing, controllers,CRUD operations

Authentication                      User login, JWT authentication,password hashing

Authorization                       Role-based access control

Validation                          Request validation withexpress-validator

File Handling                       Image upload with multer, staticfile serving

Database                            MongoDB Atlas integration throughMongoose

API Behavior                        Pagination, CORS, centralized errorhandling, 404 handling

Tech Stack

Technology              Purpose

Node.js             JavaScript runtimeExpress.js          Web framework for building the APIMongoDB Atlas       Cloud databaseMongoose            ODM for MongoDBJWT                 Authenticationbcryptjs            Password hashingMulter              File and image uploadsexpress-validator   Request validationCORS                Cross-origin request handlingdotenv              Environment variable managementNodemon             Development auto-restartPostman             API testing

Project Structure

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

Data Models

Course

{
  "title": "Node.js",
  "price": 500
}

Field     Type     Required

title   String   Yesprice   Number   Yes

User

{
  "firstName": "Esraa",
  "lastName": "Yehia",
  "email": "example@email.com",
  "password": "hashed-password",
  "role": "USER",
  "avatar": "uploads/profile.png"
}

Supported roles in the current implementation:

USER · MANGER · ADMIN

MANGER is intentionally kept as written in the current projectimplementation.

Authentication & Authorization

Authentication

Authentication is implemented using JSON Web Tokens (JWT).

After a successful login, the API returns a token. Protected requestssend the token through the Authorization header:

Authorization: Bearer <token>

The verifyToken middleware:

Reads the authorization header.

Extracts the token.

Verifies the token using JWT_SECRET_KEY.

Adds the authenticated user information to req.currentUser.

Allows the request to continue.

The current JWT expiration is configured to 2 minutes.

Authorization

Authentication answers:

Who are you?

Authorization answers:

Are you allowed to perform this action?

The project uses the allowTo middleware for role-based authorization.

Endpoint              Access

Get all courses       PublicGet a single course   PublicCreate a course       Authenticated MANGERUpdate a course       Public in the current implementationDelete a course       Authenticated ADMIN or MANGERGet all users         Authenticated

API Endpoints

Courses

Method            Endpoint                   Description       Access

GET             /api/courses             Get all courses   Public

GET             /api/courses/:courseId   Get a single      Publiccourse

POST            /api/courses             Create a course   MANGER

PATCH           /api/courses/:courseId   Update a course   Public*

DELETE          /api/courses/:courseId   Delete a course   ADMIN, MANGER

* Public access reflects the current project implementation.

Courses Pagination

GET /api/courses?page=1&limit=10

Parameter   Description                  Default

page      Page number                  1limit     Number of courses per page   10

Create Course

POST /api/courses

Authorization:

Authorization: Bearer <token>

Request body:

{
  "title": "Node.js",
  "price": 500
}

Both title and price are validated before creating the course.

Users

Method   Endpoint                Description           Access

GET    /api/users            Get all users         AuthenticatedPOST   /api/users/register   Register a new user   PublicPOST   /api/users/login      Login                 Public

User Registration

POST /api/users/register

The endpoint uses multipart/form-data because it supports an optionalavatar image.

Field         Type   Required

firstName   Text   YeslastName    Text   Yesemail       Text   Yespassword    Text   Yesrole        Text   Noavatar      File   No

Only image files are accepted.

Uploaded files are stored in the uploads/ directory.

Login

POST /api/users/login

Request body:

{
  "email": "example@email.com",
  "password": "your-password"
}

On successful login, the API returns a JWT token that can be used toaccess protected endpoints.

Uploaded Images

Uploaded images are stored in:

/uploads

The directory is exposed as static content, allowing uploaded images tobe requested through HTTP.

Error Handling

The API uses centralized error handling to return consistent errorresponses.

Example:

{
  "status": "error",
  "message": "this resource is not available",
  "code": 404,
  "data": null
}

Status Code   Meaning

200         Request succeeded201         Resource created400         Bad request401         Unauthorized404         Resource not found500         Internal server error

Environment Variables

Create a local .env file:

PORT=4000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret

Do not commit .env to GitHub.

The MongoDB connection string and JWT secret are sensitive credentialsand should be configured as environment variables.

Getting Started

1. Clone the Repository

git clone <repository-url>
cd First-API-

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file and add:

PORT=4000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret

4. Start the Development Server

npm run run:dev

The API will be available at:

http://localhost:4000

Testing

The API was tested using Postman.

Courses

Get Courses · Get Single Course · Create Course · Edit Course ·Delete Course

Users

Get All Users · Register · Login

Deployment

The API can be deployed as a Node.js Web Service on a hostingplatform such as Render.

After deployment, the production API URL can be added here:

Live API: <DEPLOYED_API_URL>

The hosting platform should be configured with the required environmentvariables:

MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=<platform-assigned-port>

The application already supports the platform-provided port:

const port = process.env.PORT || 4000;

MongoDB Atlas must also allow the deployed server to connect through itsnetwork access configuration.

What I Learned

This project was my first practical backend project and helped meunderstand the fundamentals of building a RESTful API with Node.js andExpress.

Key concepts practiced:

Node.js · Express.js · REST APIs · Routing ·Controllers · Middleware · MongoDB · Mongoose · CRUD· JWT Authentication · Authorization · Validation · FileUploads · Error Handling · Environment Variables

Repository

GitHub: Esraa-Yehia / First-API

This project represents my first practical backend API project whilelearning Node.js and Express.
