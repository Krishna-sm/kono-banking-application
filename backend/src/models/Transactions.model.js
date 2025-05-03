const mongoose= require("mongoose")

const Schema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true

    },
    amount:{
        type:Number,
        required:true
    },
    isSuccess:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        enum:['credit','debit','fix_deposit'],
        required:true
    },
    razorpayPaymentId:{
        type:String,
        default:''
    },
    razorpayOrderId:{
        type:String,
        default:''
    },
    razorpaySignature:{
        type:String,
        default:''
    },
    remark:{
        type:String,
        default:'Transaction Init'
    }
},{
    timestamps:true
})

const model = mongoose.model('transaction',Schema)

exports.TransactionModel = model