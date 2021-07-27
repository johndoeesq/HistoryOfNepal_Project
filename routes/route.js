const express = require('express');
const router = express.Router();
//const multer= require('multer');
//var upload=multer({dest: 'uploads/'})

//Including the upload middleware
const upload = require('../middleware/upload');

//Including the uploadMonument middleware
const uploadMon = require('../middleware/uploadMonument');

//Getting the functions of index
const {
    getIndexes,
    postIndex,
    putIndex,
    deleteIndex,
    uploadSideImages,
    uploadSliderImages } = require('../controllers/index');

//Getting all the functions of politics
const {
    getPolitics,
    getPoliticsSingle,
    postPolitics,
    putPolitics,
    deletePolitics
} = require('../controllers/politics');

//Getting the functions of the monuments
const {
    getMonuments,
    getMonumentSingle,
    postMonuments,
    putMonuments,
    deleteMonuments,
    addMonumentSlides
} = require('../controllers/monuments');


//Getting all the functions for the education
const {
    getEducation,
    getEducationSingle,
    postEducation,
    putEducation,
    deleteEducation
} = require('../controllers/education');


//Getting the functions of the miscellaneous
const {
    getMiscellaneous,
    getMiscellaneousSingle,
    postMiscellaneous,
    putMiscellaneous,
    deleteMiscellaneous } = require('../controllers/miscellaneous');


//Getting all the functions for the slides
const {
    getSlide,
    postSlide,
    putSlide,
    deleteSlide } = require('../controllers/slider');


//Setting the routes for index
router
    .route('/index')
    .get(getIndexes)
    .post(postIndex)
router
    .route('/index/:id')
    .put(putIndex)
    .delete(deleteIndex)

router
    .route('/index/:id/sideImages')
    .put(upload.array('sideImages', 2), uploadSideImages)

router
    .route('/index/:id/sliderImages')
    .put(upload.array('sliderImages', 2), uploadSliderImages)

//Setting the router for the monuments
router
    .route('/monuments')
    .get(getMonuments)
    .post(uploadMon.single('image'), postMonuments)
router
    .route('/monuments/:id')
    .get(getMonumentSingle)
    .put(putMonuments)
    .delete(deleteMonuments)
router
    .route('/monuments/:id/photo')
    .put(upload.array('sliderImage', 5), addMonumentSlides)


//Setting the routes for the politics
router
    .route('/politics')
    .get(getPolitics)
    .post(postPolitics)
router
    .route('/politics/:id')
    .get(getPoliticsSingle)
    .put(putPolitics)
    .delete(deletePolitics)


//Setting the routes for the education
router
    .route('/education')
    .get(getEducation)
    .post(postEducation)
router
    .route('/education/:id')
    .get(getEducationSingle)
    .put(putEducation)
    .delete(deleteEducation)


//Setting the route for the miscellaneous
router
    .route('/miscellaneous')
    .get(getMiscellaneous)
    .post(postMiscellaneous)
router
    .route('/miscellaneous/:id')
    .get(getMiscellaneousSingle)
    .put(putMiscellaneous)
    .delete(deleteMiscellaneous)


//Setting the route for the Slider
router
    .route('/slides')
    .get(getSlide)
    .post(upload.fields([{
        name:'sliderImage', maxCount:5},
        {name:'image',maxCount:1},
    {name:'pictures',maxCount:2}]), postSlide)
router
    .route('/slides/:id')
    .put(putSlide)
    .delete(deleteSlide)


//Exporting the router
module.exports = router;