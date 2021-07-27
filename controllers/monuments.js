//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//Including the monument model
const Monument = require('../models/Monuments');


//@desc getting all the monuments
exports.getMonuments = asyncHandler(async (req, res, next) => {

    const monument = await Monument.find();
    res.status(200).json({
        status: true,
        message: "Sucessfully fetched all the monuments",
        data: monument
    })
});


//@desc Getting the single monument
//@desc getting all the monuments
exports.getMonumentSingle = asyncHandler(async (req, res, next) => {

    const monument = await Monument.find();

    //Checking if the monument exists
    if (!monument) {
        return next(
            new ErrorResponse(`No Monument with the id ${req.params.id} found`), 404);
    }

    //Setting up the response
    res.status(200).json({
        status: true,
        message: "Sucessfully fetched all the monuments",
        data: monument
    })
});


//@desc posting new monumnets
exports.postMonuments = asyncHandler(async (req, res, next) => {

    //Checking if the file is there or not
    // if (req.file) {
    //     let path = ''
    //     req.file.forEach((file, index, arr) => {
    //         path = path + file.path + ','
    //     })
    //     path = path.substring(0, path.lastIndexOf(","));

        //Adding both the body and the images in the monuments
        const monument = await Monument.create(req.body, { image: path })
        res.status(201).json({
            status: true,
            message: "Sucessfully added new monument",
            data: monument
        })
    
});


//@desc updating the content of monumnets
exports.putMonuments = asyncHandler(async (req, res, next) => {

    let monument = await Monument.findById(req.params.id);

    //Checking if the monyment exists
    if (!monument) {
        return next(
            new ErrorResponse(`No Monument with the id ${req.params.id} found`), 404)
    }

    //Updating the monuments
    monument = await Monument.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true
    })
    res.status(200).json({
        status: true,
        message: "Successfully updated the monument",
        data: monument
    })
});


//@desc deleting the monument
exports.deleteMonuments = asyncHandler(async (req, res, next) => {

    const monument = await Monument.findById(req.params.id);

    //Checking if the monuments exits or not
    if (!monument) {
        return next(
            new ErrorResponse(`No Monument with the id ${req.params.id} found`), 404)
    }

    //Removing the monuments
    await monument.remove();
    res.status(200).json({
        status: true,
        message: "Successfully deleted the monuments"
    })
});



//@desc posting new monumnets slides
exports.addMonumentSlides = asyncHandler(async (req, res, next) => {

    //Checking if the file is there or not
    if (req.files) {
        let path = ''
        req.files.forEach((files, index, arr) => {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","));
        //0 is the start index and , is the end index
        const slides = await Monument.findByIdAndUpdate({ sliderImage: path });
        res.status(201).json({
            status: true,
            message: "Sucessfully added new slide images",
            data: slides
        })
    }
});




