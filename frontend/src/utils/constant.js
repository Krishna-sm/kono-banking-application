export const checkout_url ="https://checkout.razorpay.com/v1/checkout.js"

export const razorpayCallBackUrl  = (txn_id)=>{
    return `${process.env.NEXT_PUBLIC_BASE_URI}/amount/payment/${txn_id}`
}

export const txn_type ={
    "fix_deposit":{
        name:"Fix Deposit",
        "color":"text-purple-400 font-medium",
        "bg-color":"bg-purple-100",
        "desc":"a fix amount you add"
    },
    "credit":{
        name:"Credit",

        "color":"text-green-400 font-medium",
        "desc":"How much money you credit",
        "bg-color":"bg-green-200",
    },
    "debit":{
        name:"Debit",

        "color":"text-red-400 font-medium",
        "desc":"How much money you widrawl",
        "bg-color":"bg-red-100",
    }
}

export const ruppes_symbol =`₹`



export const CARD_TYPE={
    'basic':{
        max:10,
        min:0,
        message:"You Can only Withdrawal 10 RS at a Time"
    },
    'classic':{
        max:100,
        min:0,
        message:"You Can only Withdrawal 100 RS at a Time"

    },
    'platinum':{
        max:1000,
        min:0,
        message:"You Can only Withdrawal 1000 RS at a Time"
        
    }
}