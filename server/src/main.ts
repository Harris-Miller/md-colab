import cors from 'cors';
import { eq } from 'drizzle-orm';
import express from 'express';

import { db } from './dbClient';
import { documents } from './schema';

const PORT = 3001;
const app = express();

console.log('Starting express...');

app.use(cors());

// GET method route
app.get('/api', (req, res) => {
  console.log('GET /api');
  db.select()
    .from(documents)
    .limit(1)
    .then(doc => {
      res.json(doc[0]);
    });
});

// POST method route
app.post('/api', express.json(), (req, res) => {
  console.log('POST /api');
  console.log(req.body);
  const { data } = req.body as { data: string };
  db.update(documents)
    .set({ body: data })
    .where(eq(documents.id, 1))
    .then(() => {
      res.status(202).json({ data: 'ok' });
    });
});

app.use((req, res, next) => {
  console.log('404 not found');
  console.log(req.path);
  res.status(404).json({ error: '404 not found' });
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
