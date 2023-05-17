const mongoose = require('mongoose')

//define schema
const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


//create collection
const TeacherModal = mongoose.model('Teacher', TeacherSchema)

module.exports = TeacherModal