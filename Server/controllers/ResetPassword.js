const User = require('../model/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
//reset password token  
exports.resetPasswordToken = async (req, res) =>{
    try{
        const email = req.body.email;
       
       const user = await  User.findOne({email:email});
       if(!user){
        return res.json({
            success: false,
            message: 'User Does not Exists, Please registered first'
        })
       }

       //generate token --> 
       const token = crypto.randomBytes(20).toString("hex");
      //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                                        {email: email},{
                                                            token: token,
                                                            resetPasswordExpires: Date.now() + 3600000,
                                                        }, {new: true},)
                                        
       //create Url
       const url = `http://localhost:5173/update-password/${token}`;
       //send mail conatining the url
       await mailSender(email,'Password Reset Link',`Your Link for email verification is ${url}. Please click this url to reset your password.`);

       return res.json({
        success: true,
        message: 'Email Send Successfully You can reset password now',
       })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went Wrong while sending reset pwd mail'
        })
    }
}

//reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match",
            });
        }

        // Get user details from the database using the token
        const userDetails = await User.findOne({ token });

        // If token is invalid
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        // Check if token is expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Token is expired, please regenerate your token',
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password in the database
        await User.findOneAndUpdate(
            { token },
            { password: hashedPassword, token: null, resetPasswordExpires: null }, // Clear token and expiration
            { new: true }
        );

        return res.json({
            success: true,
            message: 'Password reset successfully',
        });

    } catch (err) {
        console.error(err);

        return res.json({
            success: false,
            message: 'An error occurred while resetting the password. Please try again.',
        });
    }
};
