const mongoose = require("mongoose")
const { CARD_TYPE } = require("../utils/constant")
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
    date:{
        type:Date,
        default:Date.now
    },
    card_no:{
        type:String,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    card_type:{
        type:String,
        required:true,
        enum:Object.keys(CARD_TYPE)
    },
    expiry:{
        type:Date,
        required:true
    }

    

},{
    timestamps:true
})

const model = mongoose.model("atm",Schema)

exports.ATMmodel = model