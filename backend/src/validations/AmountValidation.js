const { body } = require("express-validator");

class AmountValidation{
    static addMoney=[
        body('amount').isNumeric().notEmpty().withMessage("Amount is Required"),
        body('account_no').isString().notEmpty().withMessage("Account No???").isMongoId().withMessage("Account No is Required")
    ]

    static addAccount=[
        body('ac_type').isString().notEmpty().withMessage("Account Type  is Required").isIn(['saving','current']).withMessage("Account should be a saving or current"), 
    ]
}

module.exports =AmountValidation