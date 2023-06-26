const courseController = require('../../models/Course')
const UserModal = require('../../models/Users')
const nodemailer = require('nodemailer')

class adminController{

    static display = async(req, res) => {
        try{
            const data = await courseController.find()
            const {name, image, _id} = req.user
            res.render('admin/display', {d: data, n: name, i: image})
        }catch(error){
            console.log(error)
        }
    }
    static courseview = async(req, res) => {
        try{
            const {name, image, _id} = req.user
            const data = await courseController.findById(req.params.id)
            res.render('admin/view', {d: data, n: name, i: image})
        }catch(error){
            console.log(error)
        }
    }
    static coursedelete = async(req, res) => {
        try{
            const data = await courseController.findByIdAndDelete(req.params.id)
            res.redirect('admin/courses/display')
        }catch(error){
            console.log(error)
        }
    }
    static updatestatus = async(req, res) => {
        try{
            const {name, image, _id} = req.user
            const {comment, course, email, status} = req.body
            const data = await courseController.findByIdAndUpdate(req.params.id,{
                comment: req.body.comment,
                status : req.body.status,
            })
            this.SendEmail(comment, status, course, name, email)
            req.flash('success','status updated successfully!')
            res.redirect('../admin/display')
        }catch(error){
            console.log(error)
        }
    }

    static SendEmail = async (comment,status,course,name,email) => {
        
        //console.log("course")
        //console.log(email)
        // 1RHfz85p4XfEue4Juv
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'meharpatel2512@gmail.com',
                pass: 'ktbylytokueftsag'
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"meharpatel2512@gmail.com" <meharpatel2512@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `${name} your ${course} course  ${status} successfully, <br><b>${comment}</b>`, // html body
          });
        
    
}

}

module.exports = adminController