const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/User' )


//auth
exports.auth = async(req, res, next) =>{
    try{
        //extract token
        console.log("BEFORE TOKEN EXTRACTION")
        const token = req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer ', '');
        console.log("After Token Extraction")

        //if token missing, then return response 
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            })
        }

        //Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode;
        }catch(err){
            //verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid!'
            });
        }
        next();

    }catch(error){
        console.error("AUTH MIDDLEWARE ERROR: ", error.message);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        })
    }
}

//isStudent 
exports.isStudent = async(req, res, next) =>{
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Student Only',
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, Please try again',
        })
    }
}

//isInstructor
exports.isInstructor = async(req, res, next) =>{
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Instructor Only',
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, Please try again',
        })
    }
}

//isAdmin
exports.isAdmin = async(req, res, next) =>{
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin Only',
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, Please try again',
        })
    }
}