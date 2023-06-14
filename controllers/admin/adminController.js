class adminController{

    static display = async(req, res) => {
        try{
            res.render('admin/display')
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = adminController