/** @format */

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//Including the monument model
const Monument = require('../models/Monuments');

//@desc getting all the monuments
exports.getAllMonuments = asyncHandler(async (req, res, next) => {
	const monument = await Monument.find();
	res.status(200).json({
		status: true,
		data: monument,
	});
});

//@desc Getting the single monument
exports.getSingleMonument = asyncHandler(async (req, res, next) => {
	const monument = await Monument.find();

	//Checking if the monument exists
	if (!monument) {
		return next(
			new ErrorResponse(
				`Monument with the id ${req.params.id} could not be found`,
			),
			404,
		);
	}

	//Setting up the response
	res.status(200).json({
		status: true,
		data: monument,
	});
});

//@desc posting new monumnets
exports.createMonuments = asyncHandler(async (req, res, next) => {
	//Checking if the file is there or not
	if (!req.file) {
		return next(new ErrorResponse(`No file found`, 404));
	}

	//Creating an object
	let data = {
		image: req.file.path,
		title: req.body.title,
		description: req.body.description,
	};

	//Adding both the body and the images in the monuments
	const monument = await Monument.create(data);
	res.status(201).json({
		status: true,
		data: monument,
	});
});

//@desc updating the content of monumnets
//Private
exports.updateMonuments = asyncHandler(async (req, res, next) => {
	let monument = await Monument.findById(req.params.id);

	//Checking if the monyment exists
	if (!monument) {
		return next(
			new ErrorResponse(
				`Monument with the id ${req.params.id} could not be found`,
			),
			404,
		);
	}
	if (req.file) {
		//Creating the object
		var data = {
			image: req.file.path,
		};
	}

	var data = {
		title: req.body.title,
		description: req.body.description,
	};
	//Updating the monuments
	monument = await Monument.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidator: true,
	});

	res.status(200).json({
		status: true,
		message: 'Successfully updated the monument',
		data: monument,
	});
});

//@desc deleting the monument
//Private
exports.deleteMonuments = asyncHandler(async (req, res, next) => {
	const monument = await Monument.findById(req.params.id);

	//Checking if the monuments exits or not
	if (!monument) {
		return next(
			new ErrorResponse(
				`Monument with the id ${req.params.id} has already been deleted`,
			),
			404,
		);
	}

	//Removing the monuments
	await monument.remove();
	res.status(200).json({
		status: true,
		message: 'Successfully deleted the monuments',
	});
});
