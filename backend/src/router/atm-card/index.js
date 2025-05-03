const express = require("express")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const ATMCardValidation = require("../../validations/ATMCardValidation")
const ValidationMiddleware = require("../../middleware/ValidationMiddleware")
const ATMCardController = require("../../controller/ATMCardController")
const router = express.Router()

router.use(AuthMiddleware)

router.post('/add-new',ATMCardValidation.addNewATM,ValidationMiddleware,ATMCardController.addNewCard)
router.get('/get/:id',ATMCardValidation.atmId,ValidationMiddleware,ATMCardController.getATMById)
router.post('/withdrawal/:id',[...ATMCardValidation.atmId,...ATMCardValidation.withdrawalByATM],ValidationMiddleware,ATMCardController.withdrawalByATM)


module.exports = router