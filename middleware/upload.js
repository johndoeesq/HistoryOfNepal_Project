// //Including the multer
// const multer=require('multer');
// const GridFsStorage=require('multer-gridfs-storage');

// //Defining the storage
// const storage=new GridFsStorage({
//     url:process.env.MONGO_URI,
//     options:{
//         useNewParser:true,
//         useUnifiedTopology:true
//     },
//     file:(req,res)=>{
//         const match=["image/png","image/jpeg","image/jpg"];

//    //Verifying for the mime type not found
//    if(match.indexOf(file.mimetype)===-1){
//        const filename= `${Date.now()}-any-name-${file.originalname}`;
//        return filename;
//    }
//    return{
//        bucketname:"photos",
//        filename:`${Date.now()}-any-name-${file.originalname}`
//    }
//     }
// })

// module.exports=storage;



const path= require('path');
const multer= require('multer');

//Decalring the storage
var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
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
    fileSize:1024*1024*2
    }
})


module.exports=upload