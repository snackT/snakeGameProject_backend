import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('hello express');
  });

  
app.listen(3065, () => {
    console.log('The server is running');
  });
  