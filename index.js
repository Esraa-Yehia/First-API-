require("dotenv").config();
const url = process.env.MONGO_URL;

const express = require("express");
const app = express();
const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const mongoose = require("mongoose");
mongoose.connect(url).then(() => {
  console.log("mongodb server strated");
});

const httpStatusText = require("./utils/httpStatusText.js");

const cors = require("cors");
app.use(cors());

app.use(express.json());

const coursesRoutes = require("./routes/courses.routes.js");
app.use("/api/courses", coursesRoutes);

const usersRoutes = require("./routes/users.route.js");
app.use("/api/users",usersRoutes) // /api/users

// 404 middleware for unhandled routes
app.use((req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

//global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
