import express, { type Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import compressFilter from './utils/compressFilter';

import videoRoutes from './routes/videoRoutes';

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use('/api/v1', videoRoutes);

export default app;
