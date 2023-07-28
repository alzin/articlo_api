import { log } from 'console';
import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello to articlo backend app!!!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
