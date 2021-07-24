const mongoose= require('mongoose');

const SlideSchema= new mongoose.Schema({
    sliderImage:{
        type:String
        //maxlength:[5,'There should not more than 5 images']
    }
})

module.exports=mongoose.model('Slide',SlideSchema);

