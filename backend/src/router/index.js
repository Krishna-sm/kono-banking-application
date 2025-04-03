const express = require("express")
const router= express.Router()
const AuthRoute = require("./auth")
const routes =[{
    path:'/auth',
    route:AuthRoute
}]

routes.forEach((cur)=>{
    router.use(cur.path,cur.route)
})
module.exports = router