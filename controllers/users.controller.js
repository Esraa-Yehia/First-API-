
const asyncWrapper = require ('../middlewares/asyncWrapper');

const User = require('../models/user.model');
const appError = require('../utils/appError');

const httpStatusText = require('../utils/httpStatusText');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');



const getAllUsers=asyncWrapper(async (req, res) => {
    console.log(req.headers);
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { "__v": false,"password":false}).limit(limit).skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});


const register =asyncWrapper(async(req,res,next)=>{
    
    const {firstName , lastName, email , password,role} = req.body;

    const oldUser = await User.findOne({email: email});

    if(oldUser){
        const error = appError.create('user already exists',400,httpStatusText.FAIL)
        
        return next(error);
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password,10)
    
    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role,
        avatar: req.file ? req.file.filename : 'uploads/profile.png'
    })

    //generate JWT token
      const token = await generateJWT({email: newUser.email , id: newUser._id, role: newUser.role});
    
      newUser.token = token;
   
    await newUser.save();
    
    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: userObj }});

})

const login =asyncWrapper(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        const error = appError.create('email and password are required',400,httpStatusText.FAIL)
        
        return next(error);
    }

     const user = await User.findOne({ email: email }).select('+password');

   if(!user){
    const error = appError.create('user not found',400,httpStatusText.FAIL)
        
        return next(error);

   }
   const matchedPassword = await bcrypt.compare(password, user.password);

   if(user && matchedPassword){

      // logged in successfully

      const token = await generateJWT({email: user.email , id: user._id, role: user.role});

      return  res.json({ status: httpStatusText.SUCCESS, data: {token:token, message: 'logged in successfully'} });
   }
   else {
    const error = appError.create('incorrect password', 400, httpStatusText.FAIL);
    return next(error);
}

})

module.exports ={
    getAllUsers,
    register,
    login
};