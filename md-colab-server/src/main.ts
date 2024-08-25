import cors from 'cors';
import express from 'express';

import { db } from './dbClient';
import { documents } from './schema';

const PORT = 3001;
const app = express();

console.log('Starting express...');

app.use(cors());

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
  res.send('POST request to the homepage');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
