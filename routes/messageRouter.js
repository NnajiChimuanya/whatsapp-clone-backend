import express from "express";
import { getMessages, sendMessage } from "../controller/message.js";

const messageRouter = express.Router();

messageRouter.get("/sync", getMessages);
messageRouter.post("/new", sendMessage);

export default messageRouter;
