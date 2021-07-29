/** @format */

//Including the education model
const Education = require('../models/Education');

//Including the ErrorResponse Class
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//@desc getting all the education data
exports.getAllEducation = asyncHandler(async (req, res, next) => {
	const education = await Education.find();
	res.status(200).json({
		status: true,
		count: education.length,
		message: 'Succesfully fetched all the education',
		data: education,
	});
});

//getting a single education data
exports.getSingleEducation = asyncHandler(async (req, res, next) => {
	const education = await Education.findById(req.params.id);

	//Check if education exists
	if (!education) {
		return next(
			new ErrorResponse(`No Education data with id:${req.params.id} found`),
			404
		);
	}

	res.status(200).json({
		status: true,
		message: 'Succesfully fetched all the education',
		data: education,
	});
});

//@desc adding new education data
exports.createEducation = asyncHandler(async (req, res, next) => {
	//Checking if the file is there or not
	if (!req.file) {
		return next(new ErrorResponse(`No file found`, 404));
	}

	//Creating an object
	var data = {
		image: req.file.path,
		title: req.body.title,
		description: req.body.description,
	};
	const education = await Education.create(data);
	res.status(201).json({
		status: true,
		message: 'Succesfully added new data',
		data: education,
	});
});

//@desc getting all the education data
exports.updateEducation = asyncHandler(async (req, res, next) => {
	let education = await Education.findById(req.params.id);

	//Check if education data exists
	if (!education) {
		return next(
			new ErrorResponse(`No Education data with id:${req.params.id} found`),
			404
		);
	}

	//For image
	if(req.file){
		var data={
			image:req.file.path
		}
	}
    
	//Creating the object
	var data={
		
		title:req.body.title,
		description:req.body.description
	}

	//Updating the education
	education = await Education.findOneAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: true,
		message: 'Succesfully updated the data',
	});
});

//@desc getting all the education data
exports.deleteEducation = asyncHandler(async (req, res, next) => {
	const education = await Education.findById(req.params.id);

	//Check if education data exists
	if (!education) {
		return next(
			new ErrorResponse(`No Education data with id:${req.params.id} found`),
			404
		);
	}

	//Removing the education data
	education.remove();
	res.status(200).json({
		status: true,
		message: `Succesfully deleted data with id:${req.params.id}`,
	});
});
