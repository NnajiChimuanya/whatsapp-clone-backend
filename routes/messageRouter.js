import express from "express";
import { getMessages, sendMessage } from "../controller/message.js";

const messageRouter = express.Router();

messageRouter.get("/api/messages/sync", getMessages);
messageRouter.post("/api/message/new", sendMessage);

export default messageRouter;
