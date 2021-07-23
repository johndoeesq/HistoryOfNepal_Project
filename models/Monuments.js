//Including the mongoose
const mongoose= require('mongoose');

//Creating the monuments schema
const MonumentSchema=new mongoose.Schema({
   
    image:{
        type:String,
        required:[true,'Image should be given'],
        default:"no_img.jpg"
    },
    title:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Title should be given']
    },
    description:{
        type:String,
        required:[true,'Description should be given']
    }

})

module.exports=mongoose.model('Monument',MonumentSchema);
