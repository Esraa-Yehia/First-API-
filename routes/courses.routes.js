
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const coursesController = require('../controllers/courses.controll.js');
const { validationSchema } = require('../middlewares/validationSchema.js');

const verifyToken = require('../middlewares/verifyToken.js');

const userRoles = require('../utils/userRoles.js');

const allowedTo = require('../middlewares/allowTo.js');

router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken,allowedTo(userRoles.MANGER),validationSchema(),
    coursesController.addCourse);

router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),coursesController.deleteCourse);

module.exports = router;


