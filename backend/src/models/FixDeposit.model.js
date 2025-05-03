const mongoose = require("mongoose")

const Schema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account',
        required:true
    },
    apply_for:{
        type:String, 
        required:true,
        trim:true
    },
    amount:{
        type:Number, 
        required:true, 
    },
    isClaimed:{
        type:Boolean, 
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    interest_amount:{
        type:Number,
        default:0
    },
    remark:{
        type:String,
        default:''
    },
    claimed_date:{
        type:Date
    }



},{
    timestamps:true
})

const model = mongoose.model("fix-deposit",Schema)

exports.FixDepositModel = model