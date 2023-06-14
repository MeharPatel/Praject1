const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload")

//cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Temp file uploader 
app.use(fileUpload({useTempFiles: true}))

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');

app.use(express.urlencoded({extended : true}));

//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());

//connectdb
connectdb()

app.use(express.static('public'))

//ejs set 
app.set('view engine','ejs')

app.use('/',web)


app.listen(port, () => {
  console.log('Server start on port localhost : ' + port)
  //template string format to write string
})
