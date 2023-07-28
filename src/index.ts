import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('This is the articlo app api');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
