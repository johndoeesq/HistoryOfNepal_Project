//Including the asyncHandler
const async= require('./asyncHandler');

//Including the errorResponse
const ErrorResponse=require('../utlis/errorResponse');

//Including the User model
const User= require('../models/User');

//Including the token module
const {token}=require('morgan');

//Protecting the routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        //taking out the token
        token = req.headers.authorization.split(' ')[1];
    }

    //verifying the token
    if (!token) {
        return next(
            new ErrorResponse('Not authorize to access this route', 401));
    }

    try {
        //Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Checking for the user_id
        req.user = await User.findById(decoded.id)

        next();
    } catch (err) {
        return next(
            new ErrorResponse('Not authorize to access this route since the id was not found'
            , 401));

    }
});