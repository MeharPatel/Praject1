const mongoose = require('mongoose')

const url = "mongodb://0.0.0.0:27017/admissionportal"

const connectdb = ()=>{
    return mongoose.connect(url)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectdb