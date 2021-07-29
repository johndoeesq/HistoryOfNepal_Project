/** @format */

//Including the monument model
const Slide = require('../models/Slide');

//Including the errorHandler
const ErrorResponse = require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//@desc getting all the monuments
exports.getAllSlide = asyncHandler(async (req, res, next) => {
	const slides = await Slide.find();
	res.status(200).json({
		status: true,
		message: 'Sucessfully fetched all the images',
		data: slides,
	});
});

//@desc getting a single slide
exports.getSingleSlide = asyncHandler(async (req, res, next) => {
	const slides = await Slide.findById(req.params.id);

	//Check if slide exists
	if (!slides) {
		return next(
			new ErrorResponse(
				`No slide resource with id ${req.params.id} was found`,
				404
			)
		);
	}
	res.status(200).json({
		status: true,
		message: 'Sucessfully fetched all the images',
		data: slides,
	});
});

//@desc posting new monumnets
exports.createSlide = asyncHandler(async (req, res, next) => {
	if (req.files) {
		let path = '';

		req.files.forEach((files, index, arr) => {
			path = path + files.path + ',';
		});
		path = path.substring(0, path.lastIndexOf(','));

		const slides = await Slide.create({
			sliderImage: path,
		});
		res.status(201).json({
			status: true,
			message: 'Sucessfully added new slide images',
			data: slides,
		});
	}
});

//@desc updating the content of monumnets
exports.updateSlide = asyncHandler(async (req, res, next) => {
	let slides = await Slide.findById(req.params.id);

	//Check if slide exists
	if (!slides) {
		return next(
			new ErrorResponse(
				`No slide resource was found with id:${req.params.id}`,
				404
			)
		);
	}

	if (req.files) {
		let path = '';

		req.files.sliderImage.forEach((files, index, arr) => {
			path = path + files.path + ',';
		});
		path = path.substring(0, path.lastIndexOf(','));

		var data = {
			sliderImage: path,
		};

		//Updating the slide data
		slides = await Slide.findByIdAndUpdate(req.params.id, data, {
			new: true,
			runValidator: true,
		});
		res.status(200).json({
			status: true,
			message: 'Successfully updated the images',
			data:slides
		});
	}
});

//@desc deleting the monument
exports.deleteSlide = asyncHandler(async (req, res, next) => {
	let slides = await Slide.findById(req.params.id);

	//Check if slides exist
	if (!slides) {
		return next(
			new ErrorResponse(
				`No slide data with id:${req.params.id} was found`,
				404
			)
		);
	}

	//Deleting the slide data
	await slides.remove();
	res.status(200).json({
		status: true,
		message: 'Successfully deleted the images',
	});
});
