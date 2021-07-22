//Including the monument model
const Slide = require('../models/Slide');


//@desc getting all the monuments
exports.getSlide= async (req, res, next) => {
    try {
        const slides = await Slide.find();
        res.status(200).json({
            status: true,
            message: "Sucessfully fetched all the images",
            data: slides
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

//@desc posting new monumnets
exports.postSlide = async (req, res, next) => {
    try {
        const slides = await Slide.create(req.body)
        res.status(201).json({
            status: true,
            message: "Sucessfully added new slide images",
            data: slides
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

//@desc updating the content of monumnets
exports.putSlide = async (req, res, next) => {
    try{
        const slides =await Slide.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidator:true
        })
    res.status(200).json({
        status: true,
        message: "Successfully updated the images"
    })
}
catch(err){
    res.status(400).json({
        status:false,
        message:err.message
    })
}
}

//@desc deleting the monument
exports.deleteSlide =async (req, res, next) => {
    try{
        const slides=await Slide.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: true,
        message: "Successfully deleted the images"
    })
}
catch(err){
    res.status(400).json({
        status:false,
        message:err.message
    })
}
}

