
const {validationResult } = require('express-validator');

let{ courses} = require('../data/courses.js');

const getAllCourses = (req, res) => {
    res.json(courses);
};


const getCourse=(req, res) => {
    console.log(req.params);
    const courseId = +req.params.courseId;
    const course = courses.find ((course) => course.id === courseId);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
};

const addCourse=(req, res) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const course = {id: courses.length + 1, ...req.body};
        courses.push(course);
        res.status(201).json(course);
    }

const updateCourse=(req, res) => {
    
const courseId = +req.params.courseId;

let course = courses.find((course) => course.id === courseId);

if (!course) {
    return res.status(404).json({ message: "Course not found" });
}

course={...course, ...req.body};
res.status(200).json(course);

};


const deleteCourse=(req, res) => {
    const courseId = +req.params.courseId;

    courses = courses.filter((course)=> course.id !== courseId);

    res.status(200).json({ message: "Course deleted successfully" });
};


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};