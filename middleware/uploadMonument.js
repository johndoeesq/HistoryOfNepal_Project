

const path= require('path');
const multer= require('multer');

//Decalring the storage
var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/monuments');
    },
    filename:function(req,file,cb){
     //Extracting the file extension
     let ext=path.extname(file.originalname)
     cb(null,Date.now()+ext);
    }
})

var upload=multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        if(file.mimetype==="image.png"||"image.jpg"){
            callback(null,true)
        }else{
            console.log("Please enter the correct file format");
            callback(null,false);
        }
        
    },
    limits:{
    fileSize:1024*1024*8
    }
})


module.exports=upload