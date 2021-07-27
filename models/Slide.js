const mongoose= require('mongoose');

const SlideSchema= new mongoose.Schema({
    sliderImage:{
        type:[String],
        maxlength:[5,'There should not more than 5 images']
    },
    image:{
        type:String,
       default:"no_img.jpg"
    },
    pictures:{
        type:[String],
        maxlength:[2,'There should be two images']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Slide',SlideSchema);


