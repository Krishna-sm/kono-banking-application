const express = require('express')
const NotFoudError = require('./middleware/404Handling')
const ApiError = require('./utils/ApiError')
const app = express() 

app.use("/api/v1",require("./router"))

app.get('/', (req, res) => {
  res.send({msg:'Hello World!'})
})
app.use("",(req,res,next)=>{
    next( new ApiError(404,"Not Found"))
})

app.use(NotFoudError)
 

module.exports = app