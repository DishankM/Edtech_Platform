const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        trim: true,
    },
    courseDecription:{
        type: String,
        require: true,
        trim: true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    whatYouWillLearn:{
        type: String,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Sections",
        }
    ],
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price:{
        type: Number,
    },
    thumbnail:{
        type: String,
    },
    tags:{
        type:[String],
        require: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    studentEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    }],
    instructions: {
        type: String,
    },
    status:{
        type: String,
        enumz: ["Draft", "Published"],
    },
});

module.exports = mongoose.model("Course", courseSchema)