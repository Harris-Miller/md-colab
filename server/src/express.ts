import cors from 'cors';
import { eq } from 'drizzle-orm';
import express from 'express';

import { bodyText } from './crtd';
import { db } from './dbClient';
import { logger } from './logger';
import { documents } from './schema';

const app = express();

app.use(cors());

// GET method route
app.get('/api', (req, res) => {
  logger.info('GET /api');

  // db.select()
  //   .from(documents)
  //   .limit(1)
  //   .then(doc => {
  //     res.json(doc[0]);
  //   });

  logger.info(`bodyText :: ${bodyText.toJSON()}`);

  res.json({ data: bodyText.toJSON() });
});

// POST method route
app.post('/api', express.json(), (req, res) => {
  logger.info('POST /api');
  logger.info(req.body);

  // const { data } = req.body as { data: string };
  // db.update(documents)
  //   .set({ body: data })
  //   .where(eq(documents.id, 1))
  //   .then(() => {
  //     res.status(202).json({ data: 'ok' });
  //   });

  res.status(400).json({ error: 'Temporarily disabled' });
});

app.use((req, res, next) => {
  logger.info(`${req.method} /${req.path} - 404 not found`);

  res.status(404).json({ error: '404 not found' });
});

export { app };
