const { AccountModel } = require("../models/Account.model")
const { FixDepositModel } = require("../models/FixDeposit.model")
const { TransactionModel } = require("../models/Transactions.model")
// import { FixDepositModel } from '../models/FixDeposit.model';
// import { TransactionModel } from '../models/Transactions.model';
const { Account_LIMIT } = require("./../utils/constant")
 
const ApiError = require("../utils/ApiError")

class FixDepositService{

    static  async  AddNewFD(body,user){
        
        // verify karna hain account exist karta hai ya nhi 

        const existAccount =await AccountModel.findById(body.account)
        if(!existAccount){
            throw new ApiError(404,"Account Not Found")
        }
        //for all fd amount na to jayda ho na hi barabar ho
        if(parseInt(body.amount) >= existAccount.amount ){
            throw new ApiError(400,"Insufficient Balanace Please Add Money ")

        }
        //for current account amount limit se kam or uske barabar nhi hona chaiye 
        if(existAccount.ac_type === 'current'){
            if(existAccount.amount <= Account_LIMIT.current){
                throw new ApiError(400,"Insufficient Balanace ")
            }
        }

        const interest_amount = parseInt(body.amount)*(0.1/100)

        // apply for fd
        await FixDepositModel.create({
            account:body.account,
            amount:parseInt(body.amount),
            apply_for:body.apply_for,
            user:user,
            remark:`Fund Deposit ₹${body.amount}`,
            interest_amount:interest_amount
        })

        // add transaction
        await TransactionModel.create({
            account:body.account,
            amount:parseInt(body.amount),
            isSuccess:true,
            type:'fix_deposit',
            user:user,
            remark:`Fund Deposit ₹${body.amount}`
        })

        // amount katna hain
        await AccountModel.findByIdAndUpdate(existAccount._id,{
            amount:existAccount.amount-parseInt(body.amount)
        })

        return {
            msg:"Fund Deposit Success "
        }


    }

    static async getAllFD(user){
                
        const fix_deposits = await FixDepositModel.find({user ,isClaimed:false})
        .select("_id apply_for amount isClaimed Date")
        return fix_deposits


    }

    static async getFDById(user,id){

        const foundFD =await FixDepositModel.findOne({
            user,
            _id:id,
            isClaimed:false
        })
        if(!foundFD){
            throw new ApiError(404,"FD Not Found")
        }

        // interest rate nikalna per day ka 

        const interest_amount_per_day = Number(foundFD.amount*(0.1/100))

        // Calculate number of days since deposit
const currentDate = new Date();
const depositDate = new Date(foundFD.date);
const kitne_din = Math.floor((currentDate - depositDate) / (1000 * 60 * 60 * 24));
const totalamount = interest_amount_per_day*kitne_din
        return {...foundFD.toObject(),interest_amount_per_day,totalamount}

    }

    static async ClaimFDById(user,id){


        const foundFD =await FixDepositModel.findOne({
            user,
            _id:id,
            isClaimed:false
        })
        if(!foundFD){
            throw new ApiError(404,"FD Not Found")
        }

        // interest rate nikalna per day ka 

        const interest_amount_per_day = Number(foundFD.amount*(0.1/100))

        // Calculate number of days since deposit
const currentDate = new Date();
const depositDate = new Date(foundFD.date);
const kitne_din = Math.floor((currentDate - depositDate) / (1000 * 60 * 60 * 24));
const totalamount = interest_amount_per_day*kitne_din

const totalClaimAmount = foundFD.amount + totalamount

 // add transaction
 await TransactionModel.create({
    account:foundFD.account,
    amount:parseFloat(totalClaimAmount),
    isSuccess:true,
    type:'fix_deposit',
    user:user,
    remark:`Fund Claimed ₹${totalClaimAmount}`
})


const existAccount =await AccountModel.findById(foundFD.account)
 

await AccountModel.findByIdAndUpdate(existAccount._id,{
    amount:existAccount.amount+parseFloat(totalClaimAmount)
})

await FixDepositModel.findByIdAndUpdate( id,{
    isClaimed:true,
    claimed_date:Date.now()
})

return {
    msg:"FD Claimed :)"
}

    }
}



module.exports = FixDepositService