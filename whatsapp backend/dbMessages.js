import mongoose from "mongoose"

const messagesSchema = mongoose.Schema
(
    {
        message : String,
        name: String, 
        timeStamp: String,
        received: Boolean
    }
)

export default mongoose.model("messages",messagesSchema)