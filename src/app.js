import express from 'express';
import catrouter from './api/routes/cat-routes.js';
import userrouter from './api/routes/user-routes.js';

const app = express();
app.use(express.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/api/v1/cats', catrouter);
app.use('/api/v1/users', userrouter);

export default app;
