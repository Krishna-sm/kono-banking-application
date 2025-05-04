const express = require('express')
const NotFoudError = require('./middleware/404Handling')
const ApiError = require('./utils/ApiError')
const ValidationMiddleware = require('./middleware/ValidationMiddleware')
const app = express() 
const morgan = require("morgan")
const cors = require("cors")

// # json parsing
app.use(express.json({}))
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",require("./router"))

app.get('/', (req, res) => {
  res.send({msg:'Hello World!'})
})
app.use("",(req,res,next)=>{
    next( new ApiError(404,"Not Found"))
})
console.log(process.env.FRONTEND_URI)
app.use(NotFoudError) 
module.exports = app