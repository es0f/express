import express from 'express';
const app = express();
import catrouter from './api/routes/cat-routes.js';
app.use(express.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/v1/cats', catrouter);
export default app;
