//Including the monument model
const Slide = require('../models/Slide');

//Including the errorHandler
const ErrorResponse= require('../utlis/errorResponse');

//Bringing

//@desc getting all the monuments
exports.getSlide= async (req, res, next) => {
   
        const slides = await Slide.find();
        res.status(200).json({
            status: true,
            message: "Sucessfully fetched all the images",
            data: slides
        })
}

//@desc posting new monumnets
exports.postSlide = async (req, res, next) => {
      
    //Checking if the file is there or not
//    if(req.file){
//        let path=''
//        req.files.forEach((files,index,arr)=>{
//            path=path+files.path+','
//        })
//        path=path.substring(0,path.lastIndexOf(","));
//        const slides= await Slide.create({path});
//          res.status(201).json({
//              status: true,
//              message: "Sucessfully added new slide images",
//              data: slides
//          })
//}
    if(req.file){
        const slides= await Slide.create(req.file);
        res.status(201).json({
            status:true,
            message:"Successfully added the image"
        })
    }
}


//@desc updating the content of monumnets
exports.putSlide = async (req, res, next) => {
   
        const slides =await Slide.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidator:true
        })
    res.status(200).json({
        status: true,
        message: "Successfully updated the images"
    })
}

//@desc deleting the monument
exports.deleteSlide =async (req, res, next) => {
    
        const slides=await Slide.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: true,
        message: "Successfully deleted the images"
    })
}


