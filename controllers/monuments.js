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
		message: 'Sucessfully fetched all the monuments',
		data: monument,
	});
});

//@desc Getting the single monument
exports.getSingleMonument = asyncHandler(async (req, res, next) => {
	const monument = await Monument.find();

	//Checking if the monument exists
	if (!monument) {
		return next(
			new ErrorResponse(`No Monument with the id ${req.params.id} found`),
			404
		);
	}

	//Setting up the response
	res.status(200).json({
		status: true,
		message: 'Sucessfully fetched all the monuments',
		data: monument,
	});
});

//@desc posting new monumnets
exports.createMonuments = asyncHandler(async (req, res, next) => {
	//Checking if the file is there or not
	// if (req.file) {
	//     let path = ''
	//     req.file.forEach((file, index, arr) => {
	//         path = path + file.path + ','
	//     })
	//     path = path.substring(0, path.lastIndexOf(","));

	//Adding both the body and the images in the monuments
	const monument = await Monument.create(req.body, { image: path });
	res.status(201).json({
		status: true,
		message: 'Sucessfully added new monument',
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
			new ErrorResponse(`No Monument with the id ${req.params.id} found`),
			404
		);
	}

	//Updating the monuments
	monument = await Monument.findByIdAndUpdate(req.params.id, req.body, {
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
			new ErrorResponse(`No Monument with the id ${req.params.id} found`),
			404
		);
	}

	//Removing the monuments
	await monument.remove();
	res.status(200).json({
		status: true,
		message: 'Successfully deleted the monuments',
	});
});

// //@desc posting new monumnets slides
// //Private
// exports.updateMonumentSlides = asyncHandler(async (req, res, next) => {
// 	let monument = await Monument.findById(req.params.id);

// 	//Check if the monument exists
// 	if (!monument) {
// 		return next(
// 			new ErrorResponse(
// 				`No resource found with the id: ${req.params.id}`,
// 				404
// 			)
// 		);
// 	}

// 	//Checking if the file is there or not
// 	if (req.files) {
// 		let path = '';
// 		req.files.forEach((files, index, arr) => {
// 			path = path + files.path + ',';
// 		});
// 		path = path.substring(0, path.lastIndexOf(','));
// 		monuments = await Monument.findOneAndUpdate({
// 			sliderImage: path
// 		});
// 		res.status(201).json({
// 			status: true,
// 			message: 'Sucessfully added new slide images',
// 			data: monuments
// 		});
// 	}
// });
