const { UserModel } = require("../models/User.model")
const ApiError = require("../utils/ApiError")
const bcryptjs = require("bcryptjs")
const JWTService = require("../utils/JwtService")
const { AccountModel } = require("../models/Account.model")
const { TransactionModel } = require("../models/Transactions.model")
const { FixDepositModel } = require("../models/FixDeposit.model")
const { ATMmodel } = require("../models/ATMCard.model")


class AuthService{
    static async loginUser(body){
        
        const {email,password} = body
        const check_exist = await UserModel.findOne({email})
        if(!check_exist){
            throw new ApiError(400,"No Account Found")
        }
        const isMatch = await bcryptjs.compare(password,check_exist.password)
        if(!isMatch){
            throw new ApiError(400,"Invalid Credentials")
        }

        const token = JWTService.generateToken(check_exist._id)

        return {
            msg:"Login Success",
            "token":token
        }



    }


    static async registerUser(body){

        const {name,email,password,ac_type} = body

        const check_exist = await UserModel.findOne({email:email.toLowerCase()})
        if(check_exist){
            throw new ApiError(400,"Email Already Exist")
        }

            const user =    await UserModel.create({
                name,email,password,ac_type
               })

               const ac=  await AccountModel.create({
                user:user._id,
                amount:0,
                ac_type:ac_type
            }) 


            await TransactionModel.create({
                user:user._id,
                    account:ac._id,
                    amount:0,
                    type:'credit',
                    isSuccess:true,
                    remark:'Account Opening !'
            })



        const token = JWTService.generateToken(user._id)

               return {
                msg:"Register Success",
                "token":token
            }


    }
    static async profileUser(user){
        const userd = await UserModel.findById(user)
        .select("name email ac_type createdAt -_id")

        const profile_obj ={}

        const account = await  AccountModel.find({user})
        .select("_id amount")

        if(!account){
          const ac=  await AccountModel.create({
                user,
                amount:0
            }) 


            await TransactionModel.create({
                    account:ac._id,
                    amount:0,
                    type:'credit',
                    isSuccess:true,
                    remark:'Account Opening !',
                user:user._id,

            })

            profile_obj['account_no'] = [{
                _id:ac._id,
                amount:ac.amount
            }]  

        }
        profile_obj['account_no'] = account
        profile_obj['fd_amount'] = 0
        // profile_obj['amount'] = account.amount
        // for fd

      const fixDeposits=  await FixDepositModel.find({user,isClaimed:false})

      if(fixDeposits.length>0){

     const fd_amount= await  Promise.resolve(fixDeposits.map((cur,i)=>{
            return cur.amount
      }).reduce((pre,cur,i)=>{
        return pre+cur
      }))

      
      profile_obj['fd_amount'] = fd_amount


      }


      const atms = await ATMmodel.find({user}).select("_id card_type")
        
      



        if(!userd){
            throw new ApiError(401,"Profile Not Found")
        }
        return  {...userd.toObject(),...profile_obj,atms}

    }
}

module.exports =AuthService