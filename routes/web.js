const express = require('express')
const frontController = require('../controllers/frontController')
const courseController = require('../controllers/courseController')
const adminController = require('../controllers/admin/adminController')
const route = express.Router()
const CheckUserAuth = require('../middleware/auth')

//router
route.get('/', frontController.login)
route.get('/reg', frontController.reg)
route.get('/home', CheckUserAuth, frontController.home)
route.get('/about', CheckUserAuth, frontController.about)
route.get('/contact', CheckUserAuth, frontController.contact)
route.get('/profile', CheckUserAuth, frontController.profile)
route.get('/logout', frontController.logout)

//route
route.post('/userinsert', frontController.userinsert)
route.post('/verifylogin', frontController.verifylogin)

//CourseController
route.post('/courseinsert', CheckUserAuth, courseController.courseinsert)
route.get('/coursedisplay', CheckUserAuth, courseController.display)
route.get('/view/:id', CheckUserAuth, courseController.view)
route.get('/edit/:id', CheckUserAuth, courseController.edit)
route.post('/courseupdate/:id', CheckUserAuth, courseController.courseupdate)
route.get('/delete/:id', CheckUserAuth, courseController.coursedelete)

route.post('/changepassword', CheckUserAuth, frontController.changepassword)
route.post('/updateprofile', CheckUserAuth, frontController.updateprofile)

//admin controller
route.get('/admin/display', CheckUserAuth, adminController.display)

module.exports = route