const { body, param } = require("express-validator")

class FixDepositValidation{
    static FD_id = [
        param('id').isMongoId().withMessage("Provide valid ID").notEmpty().withMessage("ID is Required")

    ]

    static AddNewFD = [
        body('apply_for').notEmpty().withMessage("Purpose is Required"),
        body('amount').isNumeric().withMessage("Amount should be number").notEmpty().withMessage("amount is Required"),
        body('account').isMongoId().withMessage("Account No should be a valid MongoID").notEmpty().withMessage("account is Required"),

    ]
}

module.exports = FixDepositValidation