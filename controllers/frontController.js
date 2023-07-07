const UserModal = require('../models/Users')
const CourseModal = require('../models/Course')
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2
const jwt = require('jsonwebtoken')

// Configuration 
cloudinary.config({
    cloud_name: "dk0yb5sm7",
    api_key: "855991814688618",
    api_secret: "MYyLQ7kgRpdTnKw5HHCX00rpjJU",
    secure: false,
  });

class  frontController{
    static login = async(req, res)=>{
        try{
            res.render("login",{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static reg = async(req, res)=>{
        try{
            res.render("reg",{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static contact = async(req, res)=>{
        try{
            const {name, image, email, _id} = req.user
            res.render("contact", {n:name,i:image, e:email})
        }catch(error){
            console.log(error)
        }
    }
    static about = async(req, res)=>{
        try{
            const {name, image, _id} = req.user
            res.render("about", {n:name,i:image})
        }catch(error){
            console.log(error)
        }
    }
    static home = async(req, res)=>{
        try{
            const {name, email, image, _id} = req.user
            const btech = await CourseModal.findOne({userid: _id, course: 'B.Tech.'})
            const bca = await CourseModal.findOne({userid: _id, course: 'BCA'})
            const mca = await CourseModal.findOne({userid: _id, course: 'MCA'})
            res.render("home", {n:name, e:email, i:image, b:btech, bca:bca, mca: mca, id:_id})
        }catch(error){
            console.log(error)
        }
    }

    static userinsert = async(req, res)=>{
        // console.log(req.files.image)
        const imagefile = req.files.image
        const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder : 'profileimage'
        })
        // console.log(imageupload)
        
        const {name, email, password, c_password} = req.body
        const user = await UserModal.findOne({email: email})
        if(user){
            req.flash('error','Email Already Exists!!')
            res.redirect('/reg')
        }
        else{
            if(name && email && password && c_password){
                if(password == c_password){
                    try{
                        const hashpassword = await bcrypt.hash(password, 10)
                        //console.log(req.body)
                        const result = new UserModal({
                            name : name,
                            email : email,
                            password : hashpassword,
                            image:{
                                public_id: imageupload.public_id,
                                url: imageupload.secure_url
                            }
                        })
                        await result.save()
                        res.redirect('/')
                    }catch(error){
                        console.log(error)
                    }
                }
                else{
                req.flash('error','Passwords Must Match!!')
                res.redirect('/reg')
                }
            }
            else{
            req.flash('error','All Fields Are Required!!')
            res.redirect('/reg')
            }
        } 
    }

    static verifylogin = async(req, res)=>{
        try{
            const {email, password} = req.body
            if(email && password){
                const user = await UserModal.findOne({email: email})
                if(user != null){
                    const ismatched = await bcrypt.compare(password, user.password)
                    if(ismatched){
                        if(user.role == 'User'){
                            //generate token
                            const token = jwt.sign({id:user._id},'MeharPatel2512')
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/home')
                        }
                        if(user.role == 'Admin'){
                            //generate token
                            const token = jwt.sign({id:user._id},'MeharPatel2512')
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/display')
                        }
                    }else{
                        req.flash('error','Email and Password are not valid!!')
                        res.redirect('/')
                    }
                }else{
                    req.flash('error','You are not a registered user!!')
                    res.redirect('/reg')
                }
            }else{
                req.flash('error','Both Fields Are Required!!')
                res.redirect('/login')
            }
        }catch(error){
            console.log(error)
        }
    }

    static logout = async(req, res)=>{
        try{
            res.clearCookie('token')
            res.redirect("/")
        }catch(error){
            console.log(error)
        }
    }

    static profile = async(req, res)=>{
        try{
            const {name, email, image, _id} = req.user
            res.render("profile", {n:name, e:email, i:image, message1:req.flash('error'), message2:req.flash('success')})
        }catch(error){
            console.log(error)
        }
    }
    
    static changepassword = async(req, res)=>{
        try{
            const {name, email, image, _id} = req.user
            const {oldpass, newpass, conpass} = req.body
            if(oldpass && newpass && conpass){
                const user = await UserModal.findById(_id)
                const ismatch = await bcrypt.compare(oldpass, user.password)
                if(!ismatch){
                    req.flash('error','Old Password Does not match!!')
                    res.redirect('/profile')
                } else {
                    if(newpass !== conpass){
                        req.flash('error','New Password and Confirm Password Does Not Match')
                        res.redirect('/profile')
                    } else { 
                        const newhashpass = await bcrypt.hash(newpass, 10)
                        await UserModal.findByIdAndUpdate(_id, {
                            $set : {password : newhashpass},
                        });
                        req.flash('success','Password Changed Successfully')
                        res.redirect('/profile')
                    }
                }
            } else {
                req.flash('error','Enter the Details!!')
                res.redirect('/profile')
            }
        }catch(error){
            console.log(error)
        }
    }

    static updateprofile = async(req, res)=>{
        try{
            if(req.files){
                const user = await UserModal.findById(req.user._id)
                const image_id = user.image.public_id
                if(image_id != "profileimage/default_user_lweli4.jpg"){
                    await cloudinary.uploader.destroy(image_id)
                }
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder : "profileimage"
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image:{
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                }
            }
            const update_profile = await UserModal.findByIdAndUpdate(req.user._id, data)
            res.redirect('/profile')
        }catch(error){
            console.log(error)
        }
    }

}
module.exports = frontController