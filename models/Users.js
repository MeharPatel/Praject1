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
            default: "profileimage/default_user_lweli4.jpg",
        },
        url:{
            type: String,
            default: "https://res.cloudinary.com/dk0yb5sm7/image/upload/v1687959648/profileimage/default_user_lweli4.jpg",
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