const express = require("express")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const FixDepositValidation = require("../../validations/FixDepositValidation")
const ValidationMiddleware = require("../../middleware/ValidationMiddleware")
const FixDepositController = require("../../controller/FixDepositController")
const router = express.Router()

router.route('/add-new')
.post(AuthMiddleware,FixDepositValidation.AddNewFD,ValidationMiddleware,FixDepositController.AddNewFD)

router.route('/get-all')
.get(AuthMiddleware,FixDepositController.getAllFD)


router.route('/get/:id')
.get(FixDepositValidation.FD_id,ValidationMiddleware,AuthMiddleware,FixDepositController.getFDById)



router.route('/claim/:id')
.get(FixDepositValidation.FD_id,ValidationMiddleware,AuthMiddleware,FixDepositController.ClaimFDById)




module.exports = router