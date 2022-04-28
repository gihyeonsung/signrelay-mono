import express from 'express';

import Message from './entity/message';
import MessageRegistryInmemory from './registry/messageInmemory';
import MessageUseCase from './usecase/message';

const registry = new MessageRegistryInmemory();
const useCase = new MessageUseCase(registry);
const app = express();

app.use(express.json());

app.get('/messages', async (req: express.Request, res: express.Response) => {
  try {
    const messages = await useCase.readAll();
    res.json(messages);
  } catch {
    res.status(500).end();
  }
});

app.post('/messages', async (req: express.Request, res: express.Response) => {
  try {
    const message: Message = req.body;
    await useCase.create(message);
    res.status(201).end();
  } catch {
    res.status(500).end();
  }
});

app.patch('/messages/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = Number.parseInt(req.params.id);

    const message: Message = req.body;
    if (message.txSigned === undefined) {
      res.status(400).end();
    }

    const txSigned: string = message.txSigned!;
    await useCase.sign(id, txSigned);
    res.status(200).end();
  } catch {
    res.status(500).end();
  }
});

app.listen(8000, () => {
  console.log('start listening');
});
