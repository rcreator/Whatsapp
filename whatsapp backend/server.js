import Pusher from 'pusher';
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js"

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1318784",
    key: "34c68791b1bf0c13039c",
    secret: "9790708107478093f5c5",
    cluster: "eu",
    useTLS: true
  });

const connectionURL = "mongodb+srv://admin:4HCDWX3friKThB8c@cluster0.zjt34.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connectionURL)

app.use(express.json());
app.use((req,res,next)=>
{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*")
    next();
})

const db = mongoose.connection;

db.once("open",()=>{
    console.log("connection established")

    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();

    changeStream.on("change",(change)=>{
        if(change.operationType === 'insert')
        {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            });
        }
        else
        {
            console.log("Hello pls work propley jjaajahahahaahahah")
        }
    })
})



app.get("/",(req,res)=>res.status(200).send('Working fine'));


app.post("/v1/messages/new",(req,res)=>{

    const messages = req.body;
    Messages.create(messages, (err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }

    })
})

app.get("/v1/messages/sync",(req,res)=>
{
    Messages.find((err,data)=>{
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.status(200).send(data)
        }

    })
})



app.listen(port,() => console.log('Listing post 9000'))

