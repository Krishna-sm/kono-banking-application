const {config}=require("dotenv")
config({
    path:'.env'
})
const app = require("./src/app")
const { ConnectDB } = require("./src/config/db.config")
const port = process.env.PORT || 8000
ConnectDB()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })