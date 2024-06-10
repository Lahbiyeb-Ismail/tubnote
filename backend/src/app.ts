import express, { type Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import compressFilter from './utils/compressFilter';
import cors from 'cors';

import videoRoutes from './routes/videoRoutes';
import noteRoutes from './routes/noteRoutes';

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use('/api/v1', videoRoutes);
app.use('/api/v1', noteRoutes);

export default app;
