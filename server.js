import express from "express";
const app = express();
import mongoose from "mongoose";
import chatMessage from "./model/chatMessageSchema.js";
const port = process.env.PORT || 3001;
import Pusher from "pusher";
import cors from "cors";
import messageRouter from "./routes/messageRouter.js";

app.use(express.json());
app.use(cors());
// me

try {
  mongoose.connect(
    "mongodb+srv://Muanya:Muanyachi@whatsappdatabase.ra74r.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("connected");
} catch (error) {
  if (error) throw error;
}

const db = mongoose.connection;

const pusher = new Pusher({
  appId: "1412895",
  key: "e58aa4d80ab07df06992",
  secret: "af157e70ea9bf8cb6ccf",
  cluster: "eu",
  useTLS: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

db.once("open", () => {
  console.log("Db Connected");

  const collection = db.collection("chatmessages");
  const changeStream = collection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const message = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        name: message.name,
        message: message.message,
        timestamp: message.timestamp,
        recieved: message.recieved,
      });
    } else {
      console.log("Error triggerring pusher");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/", messageRouter);

//getting messages

app.listen(port, () => console.log(`Listening at port ${port}`));
