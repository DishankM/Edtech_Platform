const express = require('express');
const router = express.Router();

//course Controllers imports
const {
    createCourse,
    showAllCourse,
    getCourseDetails,
} = require('../controllers/Course');

//Categories Controllers imports
const {createCategory,
     showAllCategories,
     categoryPageDetails
    } = require('../controllers/Category');

//Sections Controllers imports
const {
    createSection,
    updateSection,
    deleteSection,
} = require('../controllers/Section');

//Sub-Sections Controllers imports
const {
    createSubsection,
    updateSubsection,
    deleteSubsection,
} = require('../controllers/Subsection');

//Rating controllers
const {createRating, 
      getAverageRating,
      getAllRatingReview
    } = require('../controllers/RatingAndReview');
    
//Importing Middlewares
const {auth, isStudent, isAdmin, isInstructor} = require('../middlewares/auth');
//const { route } = require('./User');

//  COURSE ROUTES

//courses can only be creted by Instructors
router.post('/createCourse', auth, isInstructor, createCourse);
//Add a section to a course
router.post('/addSection', auth, isInstructor, createSection);
//Update a Section
router.post('/updateSection', auth, isInstructor, updateSection);
//Delete Section
router.post('/deleteSection', auth, isInstructor, deleteSection);
//Edit Sub section
router.post('/updateSubSection', auth, isInstructor, updateSubsection);
//Delete SubSections
router.post('/deleteSubSection', auth, isInstructor, deleteSubsection);
//Add a subSection to a section
router.post('/addSubSection', auth, isInstructor, createSubsection);
//Get all Register Courses
router.get('/getAllCourses', showAllCourse);
//Get Details for specific courses
router.post('/getCourseDetails', getCourseDetails);

//CATEGORY ROUTES
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', showAllCategories);
router.post('/getCategoryPageDetails', categoryPageDetails);


//RATING AND REVIVES
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingReview);

module.exports = router;