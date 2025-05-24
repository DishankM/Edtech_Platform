const Course = require('../model/Course');
const Category = require('../model/Category');
const User = require('../model/User');
const subsection = require("../model/SubSections")
const {uploadImageToCloudinary} = require('../utils/imageUploader')

//create course  
exports.createCourse = async(req, res) =>{
    try{
        //fetch data
        const userId = req.user.id;
        
        const {courseName, 
                courseDescription, 
                whatYouWillLearn, 
                price, 
                category,
            } = req.body; 

        //get thumbnail
        //const thumbnail = req.files.thumbnailImage;
        //const instructions = JSON.parse(_instructions)

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price ||!category ){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //check for instructor
         
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "User is not an instructor",
            });
        }


        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not founds',
            })
        }
        
        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: 'Tag Details not found',
            })
        }

        //Upload Image to cloudinary
       // const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create an entry of new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            //thumbnail: thumbnailImage.secure_url,
            
        })

        //Add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
        )
        //update the TAG ka schema ----> H.W
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    courses: newCourse._id,
                },

            },
            {new: true}
        );
            //return res
            return res.status(200).json({
                success: true,
                message: 'Course Created Successfully',
                data:newCourse,
            })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Instructor Details not found'
        })
    }
}


//getAll Courses 
exports.showAllCourse = async(req, res) =>{
    try{
        const allCourse = await Course.find({}, {courseName: true,
                                                price: true,
                                                thumbnail: true,
                                                instructor: true,
                                                ratingAndReviews: true,
                                                studentEnrolled: true,
                                            }) 
                                            .populate('Instructor')
                                            .exec();
        return res.status(200).json({
            success: true,
            message: 'Data for all courses fetched successfully',
            data: allCourse,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        })
    }
}

//GET Particular ACourse Details
exports.getCourseDetails = async(req, res) =>{
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.find(
            {_id: courseId}) 
            .populate({
                path: 'instructor',
                populate:{
                    path: 'additionalDetails',
                },
            })
            .populate('category')
            //.populate('ratingAndreviews')
            .populate({
                path: "courseContent",
                populate:{
                    path: 'subSections'
                }
            })
            .exec();
        
        if(!courseDetails){
            res.status(400).json({
                success: false,
                message:` Could not find the code with ${courseId}`,
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Course Details fetched successfully',
            data: courseDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}