const ATMCardService = require("../service/ATMCardService")

class ATMCardController{
    static addNewCard =async (req,res)=>{
        const res_obj = await ATMCardService.addNewCard(req.user,req.body)
        res.status(201).send(res_obj)
    }

    static getATMById =async (req,res)=>{
        const res_obj = await ATMCardService.getATMById(req.user,req.params.id)
        res.status(200).send(res_obj)
    }
    
    static withdrawalByATM  = async(req,res)=>{
        const res_obj = await ATMCardService.withdrawalByATM(req.user,req.params.id,req.body)
        res.status(200).send(res_obj)

    }
}

module.exports = ATMCardController