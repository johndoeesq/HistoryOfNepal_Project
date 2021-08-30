/** @format */

//Including the model
const Index = require('../models/Index');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//@desc for getting all the data
//Public
exports.getAllIndexes = asyncHandler(async (req, res, next) => {
	const index = await Index.find();

	if (!index) {
		return next(new ErrorResponse('No index data was found'), 404);
	}
	res.status(200).json({
		status: true,
		message: 'Fetched all the data',
		data: index,
	});
});

//@desc for posting new data
//Private
exports.createIndex = asyncHandler(async (req, res, next) => {
	//Creating the Index
	const index = await Index.create(req.body);

	res.status(201).json({
		status: true,
		message: 'Sucessfully added new slide images',
		data: index,
	});
});

//@desc for updating the data
//Private
exports.updateIndex = asyncHandler(async (req, res, next) => {
	let index = await Index.findById(req.params.id);

	//Check if index exists
	if (!index) {
		return next(new ErrorResponse('No index data was found'), 404);
	}

	//Updating the index data
	index = await Index.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidator: true,
	});
	res.status(200).json({
		status: true,
		message: `Data Successfully Updated`,
		data: index,
	});
});

//@desc for deleting the data
//Private
exports.deleteIndex = asyncHandler(async (req, res, next) => {
	let index = await Index.findById(req.params.id);

	//Checking if the index is there or not
	if (!index) {
		return next(new ErrorResponse('No Index data was found'), 404);
	}

	//Deleting the index data
	await index.remove();
	res.status(200).json({
		status: true,
		message: `Successfully Deleted ${req.params.id} `,
	});
});

//Adding the images in the slider and side Images
//Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
	const index = await Index.findById(req.params.id);

	//Check for the index
	if (!index) {
		return next(
			new ErrorResponse(
				`No resource found with the id ${req.params.id}`,
				400
			)
		);
	}
	if (req.files) {
		let sideImagepath = '';
		let sliderImagepath = '';

		req.files.sliderImages.forEach((files, index, arr) => {
			sliderImagepath = sliderImagepath + files.path + ',';
		});

		req.files.sideImages.forEach((files, index, arr) => {
			sideImagepath = sideImagepath + files.path + ',';
		});

		sideImagepath = sideImagepath.substring(
			0,
			sideImagepath.lastIndexOf(',')
		);
		sliderImagepath = sliderImagepath.substring(
			0,
			sliderImagepath.lastIndexOf(',')
		);

		const index = await Index.findOneAndUpdate({
			sliderImages: sliderImagepath,
			sideImages: sideImagepath,
		});
		res.status(201).json({
			status: true,
			message: 'Sucessfully added new slide images',
			data: index,
		});
	}
});
