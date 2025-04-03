const {config}=require("dotenv")
config({
    path:'.env'
})
const app = require("./src/app")
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })