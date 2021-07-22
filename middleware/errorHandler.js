//Including the custom error Handler
const ErrorResponse = require('../utlis/errorResponse');

//Creating a custom errorHandler middleware
const errorHandler = (err, req, res, next) => {
     
    //MOngoose Bad ObjectID
    if (err.name === 'CastError') {
        const message = `Resource could not be found of id ${err.value}`;
        err = new ErrorResponse(message, 404)
    }

    //Mongoose Dublicate data
    if(err.code=== 11000){
        const message=`Duplicate value entered`;
        err= new ErrorResponse(message,400);
    }

    //Mongoose  Validation Error
    if(err.name==="ValidationError"){
        const message= Object.values(err.errors).map(val=>val.message);
        err= new ErrorResponse(message,400);
    }

    //Else the response
    res.status(err.statusCode || 500).json({
        status: false,
        message: err.message || 'Server Error'
    })
}

module.exports = errorHandler;