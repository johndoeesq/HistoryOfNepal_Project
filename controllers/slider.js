//Including the monument model
const Slide = require('../models/Slide');

//Including the errorHandler
const ErrorResponse= require('../utlis/errorResponse');

//Including the asyncHandler
const asyncHandler = require('../middleware/asyncHandler');

//@desc getting all the monuments
exports.getSlide= asyncHandler(async (req, res, next) => {
   
        const slides = await Slide.find();
        res.status(200).json({
            status: true,
            message: "Sucessfully fetched all the images",
            data: slides
        })
});

//@desc posting new monumnets
exports.postSlide = asyncHandler(async (req, res, next) => {
        if(req.files){
       let path=''
       let paths=''
       req.files.sliderImage.forEach((files,index,arr)=>{
           path=path+files.path+','
       })
       req.files.pictures.forEach((files,index,arr)=>{
        paths=paths+files.path+','
    })
       
       path=path.substring(0,path.lastIndexOf(","));
       paths=paths.substring(0,paths.lastIndexOf(","));
   
       //0 is the start index and , is the end index
       console.log(req.files.image)
       const image=req.files.image[0].path
       const slides= await Slide.create({sliderImage:path ,image,pictures:paths});
         res.status(201).json({
             status: true,
             message: "Sucessfully added new slide images",
             data: slides
         })
        }

});


//@desc updating the content of monumnets
exports.putSlide =asyncHandler(async (req, res, next) => {
   
        const slides =await Slide.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidator:true
        })
    res.status(200).json({
        status: true,
        message: "Successfully updated the images"
    })
});

//@desc deleting the monument
exports.deleteSlide =asyncHandler(async (req, res, next) => {
    
        const slides=await Slide.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: true,
        message: "Successfully deleted the images"
    })
});


