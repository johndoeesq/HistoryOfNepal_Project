//Including the model
const Index = require('../models/Index');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//@desc for getting all the data
exports.getIndexes = asyncHandler(async (req, res, next) => {
        const index = await Index.find();

        if(!index){
            return next(
                new ErrorResponse('No index data was found'),404
            )
        }
        res.status(200).json({
            status: true,
            message: "Fetched all the data",
            data: index
        })
   
});

//@desc for posting new data
exports.postIndex =asyncHandler(async (req, res, next) => {
   
        const index = await Index.create(req.body);
        res.status(200).json({
            status: true,
            data: index
        })
   
})


//@desc for updating the data
exports.putIndex = asyncHandler(async (req, res, next) => {

    let index= await Index.findById(req.params.id);

    //Checking if index is there or not
    if(!index){
        return next(
            new ErrorResponse('No index data was found'),404
        )
    }
    
    //Updating the index data
    index = await Index.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidator: true
        })
        res.status(200).json({
            status: true,
            message: `Data Successfully Updated`,
            data: index
        })
});

//@desc for deleting the data
exports.deleteIndex =asyncHandler(async (req, res, next) => {
    
       let index= await Index.findById(req.params.id);

       //Checking if the index is there or not
       if(!index){
           return next(
               new ErrorResponse('No Index data was found'),404
           )
       }

       //Deleting the index data
        await index.remove();
        res.status(200).json({
            status: true,
            message: `Successfully Deleted ${req.params.id} `,
        })

})