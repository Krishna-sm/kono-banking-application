const express = require("express")
const router= express.Router()
const AuthRoute = require("./auth")
const AmountRoute = require("./amount")
const FDRoute = require("./fd")
const ATMCards = require("./atm-card")
const routes =[{
    path:'/auth',
    route:AuthRoute
},{
    path:'/amount',
    route:AmountRoute
},
{
    path:'/fd',
    route:FDRoute
},{
    path:'/atm',
    route:ATMCards
}]

routes.forEach((cur)=>{
    router.use(cur.path,cur.route)
})
module.exports = router