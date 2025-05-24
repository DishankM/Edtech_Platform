const express = require('express');
const router = express.Router();


const {
    login,
    signUp,
    sendOTP,
    changePassword,
    
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword,
} = require('../controllers/ResetPassword');

const {auth} = require('../middlewares/auth')

router.post('/login', login);

router.post('/signup', signUp);

router.post('/sendotp', sendOTP);

router.post('/changepassword', auth, changePassword);

//routes for generating a reset password
router.post('/reset-password-token', resetPasswordToken)

//routes for resetting user's password after verifation
router.post('/reset-password', resetPassword);

module.exports = router;