
const {validationResult } = require('express-validator');

const Course = require('../models/course.model.js');


const getAllCourses = async(req, res) => {
    const courses = await Course.find();
    res.json(courses);
};


const getCourse= async(req, res) => {
    
    const course = await Course.findById(req.params.courseId)

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
};

const addCourse=async(req, res) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const newCourse = new Course(req.body);

        await newCourse.save()
        res.status(201).json(newCourse);
    }

const updateCourse= async(req, res) => {
    const courseId = req.params.courseId;
    
    const updatedCourse = await Course.updateOne({_id : courseId} , {$set : {...req.body}})

if (!updatedCourse) {
    return res.status(404).json({ message: "Course not found" });
}


res.status(200).json(updatedCourse);

};


const deleteCourse= async(req, res) => {
    
    await Course.deleteOne({_id: req.params.courseId})

    res.status(200).json({ message: "Course deleted successfully" });
};


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};