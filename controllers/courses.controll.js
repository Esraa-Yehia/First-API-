
const {validationResult } = require('express-validator');

const Course = require('../models/course.model.js');

const httpStatusText = require('../utils/httpStatusText.js');




const getAllCourses = async(req, res) => {

   const query = req.query;
   const limit = query.limit || 10;
   const page = query.page || 1;
   const skip = (page - 1) * limit;


    const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip);

    res.json({status: httpStatusText.SUCCESS, data: {courses}});
};


const getCourse= async(req, res) => {
   try{ 
    const course = await Course.findById(req.params.courseId)

    if (!course) {
        return res.status(404).json({ status: httpStatusText.FAIL, data: {course: 'course not found'} });
    }
    return res.json({status: httpStatusText.SUCCESS, data: {course}});
  }
   
   catch(err)
   {
    return res.status(400).json({ status: httpStatusText.ERROR, data:null,message:err.message , code: 400})
   }
};

const addCourse=async(req, res) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: httpStatusText.FAIL, data:errors.array()});
        }
    
        const newCourse = new Course(req.body);

        await newCourse.save()
        res.status(201).json({ status: httpStatusText.SUCCESS, data:{course:newCourse}});
    }

const updateCourse= async(req, res) => {
    const courseId = req.params.courseId;
     
   try{
    const updatedCourse = await Course.updateOne({_id : courseId} , {$set : {...req.body}})

   return res.status(200).json({ status: httpStatusText.SUCCESS, data:{course:updatedCourse}});
   }

   catch(err)
   {
      return res.status(400).json({ status: httpStatusText.ERROR, message: err.message});

    }
   };


const deleteCourse= async(req, res) => {
    
    await Course.deleteOne({_id: req.params.courseId})

    res.status(200).json({status: httpStatusText.SUCCESS, data:null});
};


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};