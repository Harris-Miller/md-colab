import cors from 'cors';
import { eq } from 'drizzle-orm';
import express from 'express';

import { db } from './dbClient';
import { documents } from './schema';

const PORT = 3001;
const app = express();

console.log('Starting express...');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET method route
app.get('/', (req, res) => {
  db.select()
    .from(documents)
    .limit(1)
    .then(doc => {
      res.json(doc[0]);
    });
});

// POST method route
app.post('/', (req, res) => {
  console.log('POST /');
  console.log(req.body);
  const { data } = req.body as { data: string };
  db.update(documents)
    .set({ body: data })
    .where(eq(documents.id, 1))
    .then(() => {
      res.status(202).json({ data: 'ok' });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
