import mongoose from "mongoose"

const chatMessageSchema = new mongoose.Schema({
    message : String,
    name : String,
    timestamp : String,
    recieved : Boolean
})

const chatMessage = mongoose.model("chatMessage", chatMessageSchema)

export default chatMessage;