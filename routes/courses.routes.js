
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const coursesController = require('../controllers/courses.controll.js');
const { validationSchema } = require('../middlewares/validationSchema.js');

router.route('/')
    .get(coursesController.getAllCourses)
    .post(validationSchema(),
    coursesController.addCourse);

router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

module.exports = router;


