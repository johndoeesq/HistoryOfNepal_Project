const mongoose= require('mongoose');

const IndexSchema=new mongoose.Schema({
    headerTitle:{
        type:String,
        required:[true,'Header Title must be given']
    },
    sliderImages:{
        type:[String],
        maxlength:[2,'There should be only 2 Slider Images']
    },
    mainTitle:{
        type:String,
        required:[true,'Main Title must be given']
    },
    paragraph:{
        type:[String],
        required:[true, 'Paragraphs cannot be empty'],
    },
    sideImages:{
        type:[String],
        maxlength:[2,'There should be only two images'],
        default:'side_img.jpg'
    }
    
})

module.exports=mongoose.model('Index',IndexSchema);
