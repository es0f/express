import express from 'express';
const app = express();
const PORT = 3000;
app.get('/api/v1/cats', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'jo',
    birthdate: '2022-05-10',
    weight: 3.5,
    owner: 'jojo',
    image:
      'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  };
  res.json(cat);
});
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
