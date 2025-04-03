class ApiError extends Error{
    constructor(code,msg){
        super(msg)
        this.statusCode = code
    }
}
module.exports = ApiError