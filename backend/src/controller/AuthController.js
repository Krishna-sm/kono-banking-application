const AuthService = require("../service/AuthService")

class AuthController{

    static async  loginUser(req,res){
        const res_obj = await AuthService.loginUser(req.body)
        res.status(200).send(res_obj)
    }

    static async registerUser(req,res){
        const res_obj = await AuthService.registerUser(req.body)
        res.status(201).send(res_obj)
    }

    static async profileUser(req,res){
        const res_obj = await AuthService.profileUser(req.user);
        res.status(200).send(res_obj)
    }

}
module.exports = AuthController