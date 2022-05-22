import express from "express"
const app = express()
import mongoose from "mongoose"
const port = process.env.PORT || 3000

try {
    mongoose.connect("mongodb://localhost:27017")
    console.log("connected to localdatabase")
} catch (error) {
    if(error) throw error
}


app.listen(port, () => console.log(`Listening at port ${port}`))