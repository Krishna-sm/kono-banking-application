const { ATMmodel } = require("../models/ATMCard.model")
const ApiError = require("../utils/ApiError")
const {default:random}  = require("random-int")
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
        return {
            ...body,user,id
        }
    }

}
module.exports = ATMCardService