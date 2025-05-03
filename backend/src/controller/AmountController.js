const AmountService = require("../service/AmountService")

class AmountController{


    static addMoney = async(req,res)=>{
        const res_obj = await AmountService.addMoney(req.body,req.user)
        res.status(200).send(res_obj)
    }

    static verifyPayment = async(req,res)=>{
        const res_obj = await AmountService.verifyPayment(req.body,req.params.txn_id)
        res.redirect(res_obj.url)
    }
    
    static getAllTransactions = async(req,res)=>{
        const res_obj = await AmountService.getAllTransactions(req.user)
        res.status(200).send(res_obj)
    }
    
    static addNewAccount = async(req,res)=>{
        const res_obj = await AmountService.addNewAccount(req.user,req.body)
        res.status(201).send(res_obj)
    }

    
    
}

module.exports = AmountController