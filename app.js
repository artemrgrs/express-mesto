const express = require('express');

const app = express();
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60e9d7b66ee8be4aa0ad0689',
  };

  next();
});
app.use('/', usersRoutes);
app.use('/', cardRoutes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
