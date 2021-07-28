/** @format */

const express = require('express');
const router = express.Router();

//Including the upload middleware
const upload = require('../middleware/upload');

//Including the uploadMonument middleware
const uploadMon = require('../middleware/uploadMonument');

//Getting the functions of index
const {
	getAllIndexes,
	createIndex,
	updateIndex,
	deleteIndex,
	uploadImages,
} = require('../controllers/index');

//Getting all the functions of politics
const {
	getAllPolitics,
	getSinglePolitics,
	createPolitics,
	updatePolitics,
	deletePolitics,
} = require('../controllers/politics');

//Getting the functions of the monuments
const {
	getAllMonuments,
	getSingleMonument,
	createMonuments,
	updateMonuments,
	deleteMonuments,
} = require('../controllers/monuments');

//Getting all the functions for the education
const {
	getAllEducation,
	getSingleEducation,
	createEducation,
	updateEducation,
	deleteEducation,
} = require('../controllers/education');

//Getting the functions of the miscellaneous
const {
	getAllMiscellaneous,
	getSingleMiscellaneous,
	createMiscellaneous,
	updateMiscellaneous,
	deleteMiscellaneous,
} = require('../controllers/miscellaneous');

//Getting all the functions for the slides
const {
	getAllSlide,
    getSingleSlide,
	createSlide,
	updateSlide,
	deleteSlide,
} = require('../controllers/slider');

//Setting the routes for index
router.route('/index').get(getAllIndexes).post(createIndex);
router.route('/index/:id').put(updateIndex).delete(deleteIndex);

router.route('/index/:id/photo').put(
	upload.fields([
		{ name: 'sideImages', maxCount: 2 },
		{ name: 'sliderImages', maxCount: 2 },
	]),
	uploadImages
);

//Setting the router for the monuments
router
	.route('/monuments')
	.get(getAllMonuments)
	.post(uploadMon.single('image'), createMonuments);
router
	.route('/monuments/:id')
	.get(getSingleMonument)
	.put(updateMonuments)
	.delete(deleteMonuments);

//Setting the routes for the politics
router.route('/politics').get(getAllPolitics).post(createPolitics);
router
	.route('/politics/:id')
	.get(getSinglePolitics)
	.put(updatePolitics)
	.delete(deletePolitics);

//Setting the routes for the education
router.route('/education').get(getAllEducation).post(createEducation);
router
	.route('/education/:id')
	.get(getSingleEducation)
	.put(updateEducation)
	.delete(deleteEducation);

//Setting the route for the miscellaneous
router
	.route('/miscellaneous')
	.get(getAllMiscellaneous)
	.post(createMiscellaneous);
router
	.route('/miscellaneous/:id')
	.get(getSingleMiscellaneous)
	.put(updateMiscellaneous)
	.delete(deleteMiscellaneous);

//Setting the route for the Slider
router
	.route('/slides')
	.get(getAllSlide)
	.post(upload.array('sliderImage', 5), createSlide);

router
	.route('/slides/:id')
	.get(getSingleSlide)
	.put(updateSlide)
	.delete(deleteSlide);

//Exporting the router
module.exports = router;
