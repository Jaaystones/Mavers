const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Token = require("../models/Token")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendEmail = require("../utils/emailSender")


const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, password } = req.body

    const user = await User.findById(req.user._id)

    if(!user){
        return res.status(400).json({ message: "User details not found"})
    }

    if(!oldPassword){
        return res.status(400).json({ message: "Please input old password"})
    }
    if(!password){
        return res.status(400).json({ message: "Input new password details"})
    }

    // Check if old password is correct
    comparePassword = await bcrypt.compare( oldPassword, user.password )

    // Save new password into the database
    if (user && comparePassword ){
        user.password = password
        await user.save()
        return res.status(200).json({ message: "Password changed successfully"})
    }else{
        return res.status(400).json({ message: "Error while changing password"})
    }
});

// Forgot password function
const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email });
 
    //error handling
    if(!user) {
        return res.status(400).json({message: "User not found"})
    }

    //delete previous token
    let token = await Token.findOne({userId: user._id})
    if (token){
        await token.deleteOne()
    }

    // create fresh reset token if user email is found
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    // console.log(resetToken);//Used to reset password if mail service is available
   

    // Hash token before saving to DB
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest("hex");// This is crypto method of hashing token

    // Save hashed token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 100 * (60 * 1000),//1hr
    }).save(); 

const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;


// Reset Email
const message = `
<h1>Hello ${user.username}</h1>
<p>Please use the url below to reset your password</p>  
<p>This reset link is valid for only one hour.</p>

<a href=${resetUrl} clicktracking=off>${resetUrl}</a>

<p>Regards...</p>
<p>Mavers Team</p>
`;
const subject = "Password Reset Request";
const send_to = user.email;
const sent_from ='Jaaystones@gmail.com' ;

// error handling
try {

    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
} catch (error) {
    return res.status(500).json("Email not sent, please try again");
}
});

// Reset Password
const resetPassword = asyncHandler( async(req, res) => {
    const { password }  = req.body;
    const { resetToken } = req.params;// grab the token from the url
    
    //hash token, then compare with token in db 
    const hashedToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest("hex");

    //find token in db
    const userToken = await Token.findOne({ 
        token: hashedToken,
        expiresAt: { $gt: Date.now() },// gt means greater than
    });

    //error handling
    if(!userToken) {
        return res.status(404).json({ message: "Token is invalid or has expired"});
    }

    //find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    
    // Delete the token after successful password reset
    await userToken.deleteOne();


    res.status(200).json({ message: "Password Reset Sucessfull, Please Log In"});

});

module.exports = { changePassword, forgotPassword, resetPassword }