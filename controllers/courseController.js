const CourseModal = require('../models/Course')
const nodemailer = require('nodemailer')


class  courseController{
    
    static courseinsert = async(req, res)=>{
        try{
            const {name, image, email, _id} = req.user
            const course = req.body.course
            const data = new CourseModal({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                tenth : req.body.tenth,
                twelveth : req.body.twelveth,
                course : req.body.course,
                userid: _id,
            })
            await data.save()
            this.SendEmail(course, email)
            res.redirect('/coursedisplay')
            
        }catch(error){
            console.log(error)
        }
    }

    static display = async(req, res)=>{
        try{
            const {name, image, _id} = req.user 
            const all = await CourseModal.find(req.params.userid)
            const data = await CourseModal.find({userid: _id})
            //console.log(data)
            res.render('/courses/display', {d: data, n:name, i:image})
        }catch(error){
            console.log(error)
        }
    }

    static view = async(req, res)=>{
        try{
            const {name, image, _id} = req.user
            const data = await CourseModal.findById(req.params.id)
            res.render('/courses/view', {view: data, n:name, i:image})
        }catch(error){
            console.log(error)
        }
    }

    static edit = async(req, res)=>{
        try{
            const {name, image, _id} = req.user
            const data = await CourseModal.findById(req.params.id)
            res.render('/courses/edit', {edit: data, n:name, i:image})
        }catch(error){
            console.log(error)
        }
    }

    static courseupdate = async(req, res)=>{
        try{
            const {name, image, _id} = req.user
            const data = await CourseModal.findByIdAndUpdate(req.params.id,{
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                tenth : req.body.tenth,
                twelveth : req.body.twelveth,
                course : req.body.course,
            })
            res.redirect('/coursedisplay', {n:name, i:image})
        }catch(error){
            console.log(error)
        }
    }

    static coursedelete = async(req, res)=>{
        try{
            const data = await CourseModal.findByIdAndDelete(req.params.id)
            res.redirect('/coursedisplay')
        }catch(error){
            console.log(error)
        }
    }

    static SendEmail = async (course, email) => {
        
        // console.log(course)
        // console.log(email)
        
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
            html: `your course register successfully<b>${course}</b>`, // html body
          });
        
    
}

    
}
module.exports = courseController