const UserModal = require('../models/Users')
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2
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
            res.render("login")
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
    static dashboard = async(req, res)=>{
        try{
            res.render("home")
        }catch(error){
            console.log(error)
        }
    }
    static about = async(req, res)=>{
        try{
            res.render("home")
        }catch(error){
            console.log(error)
        }
    }
    static home = async(req, res)=>{
        try{
            res.render("home")
        }catch(error){
            console.log(error)
        }
    }

    static userinsert = async(req, res)=>{
        console.log(req.file.image)
        /*
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
                            password : hashpassword
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
        */
        
    }
}
module.exports = frontController