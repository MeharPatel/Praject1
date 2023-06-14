const jwt = require('jsonwebtoken')
const UserModal = require('../models/Users')

const CheckUserAuth = async(req, res, next) => {
    //console.log("Hello User!")
    const{token} = req.cookies
    //console.log(token)
    if(!token){
        req.flash('error', 'Unauthorized User! Please Login!')
        return res.redirect('/')
    } else {
        const verify_token = jwt.verify(token, 'MeharPatel2512')
        //console.log(verify_token)
        const data = await UserModal.findOne({_id : verify_token.id})
        //console.log(data)
        req.user = data
        next()
    }
}
module.exports = CheckUserAuth