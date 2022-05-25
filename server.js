
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require ("dotenv").config()
const { PORT = 3001 , DATABASE_URL} = process.env
/* ----------------------------- import express ----------------------------- */
const express = require("express")
const app = express()
/* ----------------------------- import mongoose ---------------------------- */
const mongoose = require("mongoose")

/* ---------------------------- import middleware --------------------------- */
const cors = require ("cors")
const morgan = require ("morgan")


///////////////////////////////
// DATABASE CONNECTION
///////////////////////////////

mongoose.connect(DATABASE_URL)
mongoose.connection
.on("open", ()=> console.log("MongoDB Connected"))
.on("close", ()=> console.log("You are disconnected from MongoDB"))
.on("error", (error)=> console.log(error))

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()) // to prevent core errors, open acces to all origins 
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies 


///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/", (req, res)=>{
    res.send ("hello world")
})

// People Index Route
app.get ("/people", async (req, res)=>{
    try{
        //send all people
        res.json(await People.find({}))
    }catch (error){
        //send error
        res.status(400).json(error)
    }
})

// PEOPLE CREATE ROUTE
app.post("/people", async (req,res)=>{
    try{
        //send all people
        res.json(await People.create(req.body))
    }catch (error){
        res.status(400).json(error)
    }
})

// People DELETE route 
app.delete("/people/:id", async (req,res)=>{
    try {
        res.json(await People.findByIdAndDelete(req.params.id))
    }catch (error){
        res.status(400).json(error)
    }
})

// People Update route
app.put("/people/:id", async(req,res)=>{
    try{
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    } catch (error){
        res.status(400).json(error)
    }
})
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, ()=> console.log(`listening on PORT ${PORT}`))

