const ApiError = require("../utils/ApiError")

const NotFoudError=(err,req,res,next)=>{
    console.log(err.message)
    const error_obj= {
        code:500,
        msg:err.message,
        stack:err.stack
    }
    if(err instanceof ApiError){
        error_obj.code = err.statusCode
    }

    res.status(error_obj.code).send(error_obj)


}
module.exports = NotFoudError