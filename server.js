import express from "express";
const app = express();
import mongoose from "mongoose";
import chatMessage from "./model/chatMessageSchema.js";
const port = process.env.PORT || 3001;
import Pusher from "pusher";
import cors from "cors";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";
import passport from "passport";
import session from "express-session";

app.use(express.json());
app.use(
  cors({
    origin: "https://w-clone.vercel.app",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(
  session({
    secret: "muanya",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://w-clone.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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

// app.get("/", (req, res) => res.send("LoggedIn"));

app.use("/api/message", messageRouter);
app.use("/", userRouter);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

//getting messages

app.listen(port, () => console.log(`Listening at port ${port}`));
