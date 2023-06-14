const mongoose = require('mongoose')

//define schema
const UserSchema = new mongoose.Schema({
    name: {
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
    },
    image: {
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    role:{
        type: String,
        default: 'User',
    },
},{timestamps: true})


//create collection
const UserModal = mongoose.model('Users', UserSchema)

module.exports = UserModal