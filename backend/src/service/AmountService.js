const { AccountModel } = require("../models/Account.model");
const { TransactionModel } = require("../models/Transactions.model");
const { UserModel } = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { NewRazorpay } = require("../utils/Razarpay");
const crypto = require("crypto")
class AmountService{

    static async addMoney(body,user){
 

      const transaction=  await TransactionModel.create({
            account:body.account_no,
            user:user,
            amount:parseInt(body.amount),
            type:'credit'
        })

        const options = {
            amount: parseInt(body.amount)*100,
            currency: 'INR',
            receipt: transaction._id
        };
        const order = await NewRazorpay.orders.create(options)




        return {
           order_id:order.id,
           txn_id:transaction._id
        }
    }

    static async verifyPayment(body,txn_id){

        const {razorpay_order_id ,razorpay_payment_id ,razorpay_signature} =body


        const body_data = razorpay_order_id + "|" + razorpay_payment_id;


        const expect = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SCREATE || "")
        .update(body_data)
        .digest("hex");

        const isValid = expect === razorpay_signature;
        if(!isValid){
            return {
                url:`${process.env.FRONTEND_URI}/transactions?error=Transaction Failed`
            }
        }


        // update transaction and add amount in to account

       const transaction= await TransactionModel.findByIdAndUpdate(txn_id,{
            isSuccess:true,
            razorpayOrderId:razorpay_order_id,
            razorpayPaymentId:razorpay_payment_id,
            razorpaySignature:razorpay_signature,
             remark:'Payment Credit '
        })


     const account=    await AccountModel.findById(transaction.account)

        await AccountModel.findByIdAndUpdate(account._id,{
            amount:account.amount+transaction.amount
        })

        return {
            url:`${process.env.FRONTEND_URI}/transactions?success=Transaction Success`
        }
 
    }

    static async getAllTransactions(user){
        const all_transaction  =await TransactionModel.find({user})
        .sort({createdAt:-1})
        .select("type remark createdAt amount isSuccess")

        return all_transaction


    }

    static async addNewAccount(user,body){
        
      const exist_user=  await UserModel.findById(user)
      if(!exist_user){
        throw new ApiError(401,"User Not Found")
      }

      const ac=  await AccountModel.create({
            user,
            ac_type:body.ac_type,
            amount:0
        })

        await TransactionModel.create({
            account:ac._id,
            amount:0,
            remark:'New Account Opening',
            type:'credit',
            user:user,
            isSuccess:true
        })

        return {
            msg:"Account Created :)"
        }

    }

}

module.exports = AmountService