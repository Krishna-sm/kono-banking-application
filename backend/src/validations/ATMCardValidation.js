const { body ,param} = require("express-validator")
const { CARD_TYPE } = require("../utils/constant") 

class ATMCardValidation{
    static atmId = [
        param('id').notEmpty().withMessage("ID is Required").isMongoId().withMessage("ATM ID should be a valid mongodb id")
        

    ] 
    static withdrawalByATM = [
        body('pin').notEmpty().withMessage("PIN is Required").isLength({max:4,min:4}).withMessage("PIN Length Should be equal to 4"),
        body('amount').isNumeric().notEmpty().withMessage("Amount is Required"),

        

    ]
    static addNewATM = [
        body('account').notEmpty().withMessage("Account is Required").isMongoId().withMessage("Account should be a valid mongodb id"),
        body('pin').notEmpty().withMessage("PIN is Required").isLength({max:4,min:4}).withMessage("PIN Length Should be equal to 4"),
        body('card_type').notEmpty().withMessage("Card Type is Required").isIn(Object.keys(CARD_TYPE)).withMessage("Select Valid Card Type")
        

    ]
}

module.exports =ATMCardValidation