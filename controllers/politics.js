//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
//const asyncHandler = require('../middleware/asyncHandler');

//Including the politics model
const Politics = require('../models/Politics');


//@desc getting all the politics data
exports.getPolitics = async (req, res, next) => {
    const politics = await Politics.find();
    res.status(200).json({
        status: true,
        count: politics.length,
        message: "Succesfully fetched all the politics",
        data: politics
    })
}


//@desc getting single Politics data 
exports.getPoliticsSingle = async (req, res, next) => {

    const politics = await Politics.findById(req.params.id);

    //Checking if the politics exists or not
    if (!politics) {
        return next(
            new ErrorResponse(`No Politics with the id ${req.params.id} found`), 404)
    }

    //Setting up the response
    res.status(200).json({
        status: true,
        count: politics.length,
        message: "Succesfully fetched the politics",
        data: politics
    })
};


//@desc adding new politics data
exports.postPolitics = async (req, res, next) => {

    const politics = await Politics.create(req.body);
    res.status(201).json({
        status: true,
        message: "Succesfully added new data",
        data: politics
    })

}


//@desc getting all the politics data
exports.putPolitics = async (req, res, next) => {

    //Finding the specific politics data
    let politics = await Politics.findById(req.params.id);

    //Checking if the politics is there or not
    if (!politics) {
        return next(
            new ErrorResponse(`No Politics data with id:${req.params.id} found`), 404)
    }

    //Updating the politics data
    politics = await Politics.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: true,
        message: "Succesfully updated the data",
        data: politics
    })
}


//@desc getting all the politics data
exports.deletePolitics = async (req, res, next) => {

    //Finding the specific politics data
    let politics = await Politics.findById(req.params.id);

    //Checking if the politics is there or not
    if (!politics) {
        return next(
            new ErrorResponse(`No Politics data with id:${req.params.id} found`), 404)
    }


    //Removing the politics data
    await politics.remove();
    res.status(200).json({
        status: true,
        message: "Succesfully deleted data"
    })

}