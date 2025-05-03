const FixDepositService = require("../service/FixDepositService")
class FixDepositController{

    static AddNewFD = async(req,res)=>{
        const res_obj = await FixDepositService.AddNewFD(req.body,req.user)
        res.status(201).send(res_obj)
    }
    static getAllFD = async(req,res)=>{
        const res_obj = await FixDepositService.getAllFD(req.user)
        res.status(200).send(res_obj)
    }
    

    static getFDById = async(req,res)=>{
        const res_obj = await FixDepositService.getFDById(req.user,req.params.id)
        res.status(200).send(res_obj)
    }

    static ClaimFDById = async(req,res)=>{
        const res_obj = await FixDepositService.ClaimFDById(req.user,req.params.id)
        res.status(200).send(res_obj)
    }

    

}

module.exports = FixDepositController