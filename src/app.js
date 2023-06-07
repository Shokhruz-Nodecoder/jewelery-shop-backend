require("dotenv/config")
const express = require("express")
const app = express()

const Routes = require("./routes/index")

app.use(express.json())
app.use("/api",  Routes)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Express server listening on port ${PORT}`)
})  