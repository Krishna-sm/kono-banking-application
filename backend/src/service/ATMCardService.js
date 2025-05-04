const { AccountModel } = require("../models/Account.model")
const { ATMmodel } = require("../models/ATMCard.model")
const {UserModel} = require("../models/User.model")
const ApiError = require("../utils/ApiError")
const {default:random}  = require("random-int")
const { Account_LIMIT, CARD_TYPE } = require("../utils/constant")
const { TransactionModel } = require("../models/Transactions.model")
class ATMCardService{


    static addNewCard = async(user,body)=>{

    const   exist_atm= await ATMmodel.findOne({
            account:body.account,
            card_type:body.card_type

        })

        if(exist_atm){
            throw new ApiError(400,"Card Already Exists")
        }

        const generateATMNO = ()=>{
         return   random(1000, 9999)+""+random(1000, 9999)+""+random(1000, 9999)+""+random(1000, 9999)
        }

        const cvv_no = random(100, 999)

        const date = new Date()
        date.setMonth(date.getMonth()+3)
        const expiry = date

        await ATMmodel.create({
            account:body.account,
            card_no:generateATMNO(),
            card_type:body.card_type,
            cvv:cvv_no,
            pin:body.pin,
            expiry:expiry,
            user
        })


        return {
           msg:"Card Generated :)"
        }
    }

    static getATMById = async(user,id)=>{
        

        const atmCard = await ATMmodel.findById(id)
        .select("-pin -user -account")
        return atmCard

    }

    static withdrawalByATM = async(user,id,body)=>{

        const user_exist = await UserModel.findById(user)
        const amount_req = Number(body.amount) 

        if(!user_exist){
            throw new ApiError(401,"Invalid User")
        }

        const atm_details = await ATMmodel.findById(id)
        if(!atm_details){
            throw new ApiError(400,"Details Not Found")
        }

        
        const account = await AccountModel.findById(atm_details.account)
        if(!account){
            throw new ApiError(400,"Account Not Found")
        }

        
        // pin verification
        if(parseInt(body.pin) !== atm_details.pin){
            await TransactionModel.create({
                type:'debit',
                account:account._id,
                user:user,
                isSuccess:false,
                amount:amount_req,
                remark:`Entered Invalid PIN`
            })
            throw new ApiError(401,"Invalid PIN")
        }


        // check account limit
          //for current account amount limit se kam or uske barabar nhi hona chaiye 
               if(account.ac_type === 'current'){
                   if(account.amount <= Account_LIMIT.current){
                    await TransactionModel.create({
                        type:'debit',
                        account:account._id,
                        user:user,
                        isSuccess:false,
                        amount:amount_req,
                        remark:`amount not withdrawl  Insufficient Balanace by Limit`
                    })
                       throw new ApiError(400,"Insufficient Balanace by Limit ")
                   }
               }
            // for amount
        if(amount_req>=account.amount){
            await TransactionModel.create({
                type:'debit',
                account:account._id,
                user:user,
                isSuccess:false,
                amount:amount_req,
                remark:`amount not withdrawl  Insufficient fund`
            })
            throw new ApiError(400,"Insufficient Fund")
              // transaction 
      
        }

        // atm card ki limit

        switch(atm_details.card_type){
            case 'basic':
             
                if((amount_req<CARD_TYPE.basic.min)){
                    throw new ApiError(400,"Amount in Minimum ")
                }
                if((amount_req>CARD_TYPE.basic.max)){
                    throw new ApiError(400,"Amount in Maxmimum ")
                }
                break
            case 'classic':
                if((amount_req<CARD_TYPE.classic.min)){
                    throw new ApiError(400,"Amount in Minimum ")
                }
                if((amount_req>CARD_TYPE.classic.max)){
                    throw new ApiError(400,"Amount in Maxmimum ")
                }
            break
            case 'platinum':
                if((amount_req<CARD_TYPE.platinum.min)){
                    throw new ApiError(400,"Amount in Minimum ")
                }
                if((amount_req>CARD_TYPE.platinum.max)){
                    throw new ApiError(400,"Amount in Maxmimum ")
                }
                break
            default:
                throw new ApiError(400,"Card Invalid")
                break
        }

        // amount widthrawl

        await AccountModel.findByIdAndUpdate(account._id,{
            amount: account.amount-amount_req
        })

        // transaction 
        await TransactionModel.create({
            type:'debit',
            account:account._id,
            user:user,
            isSuccess:true,
            amount:amount_req,
            remark:`amount withdrawl  ${amount_req}`
        })
            


        return {
           msg:"Amount Withdrawl"
        }
    }

}
module.exports = ATMCardService