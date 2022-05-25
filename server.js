
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require ("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()
const mongoose = require("mongoose")

///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/", (req, res)=>{
    res.send ("hello world")
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, ()=> console.log(`listening on PORT ${PORT}`))

