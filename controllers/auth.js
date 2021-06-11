const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    //pass in username that will be received
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });
        //  in here is usually a response with a token from jwt

        // the response below is for testing on postman
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        // use this code below 
        // res.status(500).json({
         //   success: false,
         //   error: error.message,
        //});
        // or better still use custom made error handler
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // res.status(400).json({ success: false, error: "please provide an email and a password"})

        // use custome error handler
        return next(new ErrorResponse("please provide an email address and a password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
           // res.status(404).json({ success: false, error: "User not found" })

            // use custome error handler
            return next(new ErrorResponse("User not found", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            // res.status(404).json({ success: false, error: "Invalid Credentials"})

            // use custome error handler
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        res.status(200).json({ success: true, token: "tghyhg3567ki34g"});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};
