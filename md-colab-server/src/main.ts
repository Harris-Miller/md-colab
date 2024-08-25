import express from 'express';

import { db } from './dbClient.js';
import { documents } from './schema.js';

const app = express();

console.log('Starting express...');

// GET method route
app.get('/', (req, res) => {
  db.select()
    .from(documents)
    .limit(10)
    .then(doc => {
      console.log(doc);
      res.send('GET request to the homepage');
    });
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});
