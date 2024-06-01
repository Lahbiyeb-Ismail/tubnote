import express, { type Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const PORT = process.env['PORT'] || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
