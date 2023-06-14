const mongoose = require('mongoose')

//define schema
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tenth: {
        type: String,
        required: true
    },
    twelveth: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
    }
},{timestamps: true})


//create collection
const CourseModal = mongoose.model('Course', CourseSchema)

module.exports = CourseModal