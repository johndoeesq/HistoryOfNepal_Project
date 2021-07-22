//Including the education model
const Education = require('../models/Education');

//Including the ErrorResponse Class
const ErrorResponse = require('../utlis/errorResponse');

//@desc getting all the education data
exports.getEducation = async (req, res, next) => {

    const education = await Education.find();
    res.status(200).json({
        status: true,
        count: education.length,
        message: "Succesfully fetched all the education",
        data: education
    })
}


//getting a single education data
exports.getEducationSingle = async (req, res, next) => {

    const education = await Education.findById(req.params.id);

    //Checking for the education existence
    if (!education) {
        return next(
            new ErrorResponse(`No Education data with id:${req.params.id} found`), 404);
    }

    res.status(200).json({
        status: true,
        message: "Succesfully fetched all the education",
        data: education
    })
}


//@desc adding new education data
exports.postEducation = async (req, res, next) => {

    const education = await Education.create(req.body);
    res.status(201).json({
        status: true,
        message: "Succesfully added new data",
        data: education
    })
}


//@desc getting all the education data
exports.putEducation = async (req, res, next) => {
  
        let education= await Education.findById(req.params.id);

        //Checking if education exists
        if(!education){
            return next(
                new ErrorResponse(`No Education data with id:${req.params.id} found`),404);
        }

        //Updating the education
        education = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: true,
            message: "Succesfully updated the data"
        })
}


//@desc getting all the education data
exports.deleteEducation = async (req, res, next) => {

    const education = await Education.findById(req.params.id);

    //Checking if education data exists
    if (!education) {
        return next(
            new ErrorResponse(`No Education data with id:${req.params.id} found`), 404);
    }

    //Removing the education data
    education.remove();
    res.status(200).json({
        status: true,
        message: "Succesfully deleted data"
    })
}
