/** @format */

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//Including the politics model
const Politics = require('../models/Politics');

//@desc getting all the politics data
//Public
exports.getAllPolitics = asyncHandler(async (req, res, next) => {
	const politics = await Politics.find();
	res.status(200).json({
		status: true,
		count: politics.length,
		message: 'Succesfully fetched all the politics',
		data: politics,
	});
});

//@desc getting single Politics data
//Public
exports.getSinglePolitics = asyncHandler(async (req, res, next) => {
	const politics = await Politics.findById(req.params.id);

	//Checking if the politics exists or not
	if (!politics) {
		return next(
			new ErrorResponse(`No Politics with the id ${req.params.id} found`),
			404
		);
	}

	//Setting up the response
	res.status(200).json({
		status: true,
		count: politics.length,
		message: 'Succesfully fetched the politics',
		data: politics,
	});
});

//@desc adding new politics data
//Private
exports.createPolitics = asyncHandler(async (req, res, next) => {
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
	const politics = await Politics.create(data);
	res.status(201).json({
		status: true,
		message: 'Succesfully added new data',
		data: politics,
	});
});

//@desc getting all the politics data
//Private
exports.updatePolitics = asyncHandler(async (req, res, next) => {
	//Finding the specific politics data
	let politics = await Politics.findById(req.params.id);

	//Check if the politics exists
	if (!politics) {
		return next(
			new ErrorResponse(`No Politics data with id:${req.params.id} found`),
			404
		);
	}

	//For image
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
		message: 'Succesfully updated the data',
		data: politics,
	});
});

//@desc getting all the politics data
//Private
exports.deletePolitics = asyncHandler(async (req, res, next) => {
	//Finding the specific politics data
	let politics = await Politics.findById(req.params.id);

	//Check if the politics exists
	if (!politics) {
		return next(
			new ErrorResponse(`No Politics data with id:${req.params.id} found`),
			404
		);
	}

	//Removing the politics data
	await politics.remove();
	res.status(200).json({
		status: true,
		message: 'Succesfully deleted data',
	});
});
