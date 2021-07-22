//Including the model
const Index = require('../models/Index');


//@desc for getting all the data
exports.getIndexes = async (req, res, next) => {

    try {
        const index = await Index.find()
        res.status(200).json({
            status: true,
            message: "Fetched all the data",
            data: index
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message

        })
    }
}

//@desc for posting new data
exports.postIndex = async (req, res, next) => {
    try {
        const index = await Index.create(req.body);
        res.status(200).json({
            status: true,
            data: index
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}


//@desc for updating the data
exports.putIndex = async (req, res, next) => {
    try {
        const index = await Index.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidator: true
        })
        res.status(200).json({
            status: true,
            message: `Data Successfully Updated`,
            data: index
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

//@desc for deleting the data
exports.deleteIndex = async (req, res, next) => {
    try {
        const index = await Index.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: true,
            message: `Successfully Deleted ${req.params.id} `,
        })

    }

    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }


}