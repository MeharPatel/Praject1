const express = require('express')
const frontController = require('../controllers/frontController')
const courseController = require('../controllers/courseController')
const route = express.Router()

//router
route.get('/',frontController.login)
route.get('/reg',frontController.reg)
route.get('/dashboard',frontController.dashboard)
route.get('/about',frontController.about)
route.get('/home',frontController.home)

//route
route.post('/userinsert', frontController.userinsert)

//CourseController
route.post('/courseinsert', courseController.courseinsert)
route.get('/coursedisplay',courseController.display)
route.get('/view/:id',courseController.view)
route.get('/edit/:id',courseController.edit)
route.post('/courseupdate/:id',courseController.courseupdate)
route.get('/delete/:id',courseController.coursedelete)

module.exports = route