import chatMessage from "../model/chatMessageSchema.js";

export const getMessages = (req, res) => {
  chatMessage.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const sendMessage = (req, res) => {
  const newMessage = req.body;

  chatMessage.create(newMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
