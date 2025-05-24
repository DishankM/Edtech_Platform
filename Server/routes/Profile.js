const express = require('express');
const router = express.Router()
const {auth} = require('../middlewares/auth')

const{
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require('../controllers/Profile');


//Delete user Account
router.delete('/deleteProfile', auth, deleteAccount);
router.put('/updateProfile', auth, updateProfile);
router.get('/getUserDetails', auth, getAllUserDetails);

//get Enrolled Courses
 router.get('/getEnrolledCourses', auth, getEnrolledCourses);
 router.put('/updateProfilePicture', auth, updateDisplayPicture,);

module.exports = router;