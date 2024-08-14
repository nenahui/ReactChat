import express from 'express';
import { randomUUID } from 'node:crypto';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  if (req.query.datetime) {
    if (isNaN(date.getDate())) {
      return res.status(400).send({
        error: 'Invalid date',
      });
    }

    const filteredMessages = messages.filter((item) => item.createdAt > date.toISOString());
    return res.send(filteredMessages);
  }

  return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.message || !req.body.author) {
    return res.status(400).send({ error: 'Author and message must be present in the request' });
  }

  const message = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    author: req.body.author,
    message: req.body.message,
  };

  const savedProduct = await fileDb.addItem(message);

  return res.send(savedProduct);
});

export default messagesRouter;
