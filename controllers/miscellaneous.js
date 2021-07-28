//Including the miscellaneous model
const Miscellaneous = require('../models/Miscellaneous');

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');


//@desc getting all the miscellaneous data
//Public
exports.getAllMiscellaneous = asyncHandler(async (req, res, next) => {
    
        const miscellaneous = await Miscellaneous.find();
        res.status(200).json({
            status: true,
            count:miscellaneous.length,
            message: "Successfully fetched all the miscellaneous",
            data: miscellaneous
        })
});


//getting single monuments
//Public
exports.getSingleMiscellaneous= asyncHandler(async (req, res, next) => {
   
        const miscellaneous = await Miscellaneous.findById(req.params.id);

        //Checking if the miscellaneous exists
        if(!miscellaneous){
            return next(
                new ErrorResponse(`No Miscellaneous data with id:${req.params.id} found`),404);
        }
        res.status(200).json({
            status: true,
            count:miscellaneous.length,
            message: "Successfully fetched all the miscellaneous",
            data: miscellaneous
        })
  
})


//@desc adding new miscellaneous data
//Private
exports.createMiscellaneous = asyncHandler(async (req, res, next) => {
    try {
        const miscellaneous = await Miscellaneous.create(req.body)
        res.status(200).json({
            status: true,
            message: "Successfully added new data",
            data: miscellaneous
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }

});


//@desc updating the miscellaneous data
exports.updateMiscellaneous = asyncHandler(async (req, res, next) => {
    
        let miscellaneous=await Miscellaneous.findById(req.params.id);

        //Check if the Miscellaneous exists
        if(!miscellaneous){
            return next(
                new ErrorResponse(`No Miscellaneous data with id:${req.params.id} found`),404);
        }

        //Updating the miscellaneous data
        miscellaneous = await Miscellaneous.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: true,
            message: "Successfully updated the data",
            data: miscellaneous
        })
   
});


//@desc getting all the miscellaneous data
//Private
exports.deleteMiscellaneous = asyncHandler(async (req, res, next) => {
  
        const miscellaneous = await Miscellaneous.findById(req.params.id)

        //Check if the Miscellaneous exists
        if(!miscellaneous){
            return next(
                new ErrorResponse(`No Miscellaneous data with id:${req.params.id} found`),404);
        }

        //Deleting the data
        miscellaneous.remove(); 
        res.status(200).json({
            status: true,
            message: "Successfully deleted the data"
        })
    });
