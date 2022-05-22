import express from "express"
const app = express()
import mongoose from "mongoose"
import chatMessage from "./model/chatMessageSchema.js"
const port = process.env.PORT || 3001

app.use(express.json())

try {
    mongoose.connect("mongodb://localhost:27017/whatsappDatabase")
    console.log("connected to localdatabase")
} catch (error) {
    if(error) throw error
}

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

app.post("/api/message/new", (req, res) => {
    const newMessage = req.body

    chatMessage.create(newMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})


//getting messages
app.get("/api/messages/sync", (req, res) => {
    chatMessage.find({}, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, () => console.log(`Listening at port ${port}`))