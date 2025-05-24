const RatingAndReview = require('../model/RatingAndReview');
const Course = require('../model/Course');
const { default: mongoose } = require('mongoose');

exports.createRating = async(req, res) =>{
    try{
        ///get userid
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                                {_id: courseId,
                                                studentEnrolled: {$elemMatch: {$eq: userId}}, //the user id exist or not
                                                    
                                                });
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            })
        }
        //check if user already reviewed the course

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })

        if(alreadyReviewed){
            res.status(403).json({
                success: false,
                message: "Course is already reviwed by the user",
            })
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId,
        });

        //Update the course with rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews: ratingReview._id,
            }
        },{new: true});
        console.log(updatedCourseDetails)

        return res.status(200).json({
            success: true,
            message: "Rating and Review craeted Successfully",
            ratingReview,
        })
    }catch(error){  
        console.log(error);
        return res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}


//getAverageRating
exports.getAverageRating = async(req, res) =>{
    try{
        //get course ID
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating : {$avg: "$rating"},
                }
            }           
        ])

        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating- review exist
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no rating given till now',
            averageRating: 0,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}

//getAlRatingAndReview
exports.getAllRatingReview = async(req, res) =>{
    try{
        const allReviews = await RatingAndReview.find({})
                                               .sort({rating: "desc"})
                                               .populate({
                                                    path: "user",

                                               })
                                               .populate({
                                                    path: 'course',
                                                    select: "courseName",
                                               })
                                               .exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: error.message, 
        })
    }
}