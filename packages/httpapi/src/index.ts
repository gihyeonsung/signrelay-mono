import express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hi');
});

console.log('loaded');

app.listen(8000, () => {
  console.log('start listening');
});
