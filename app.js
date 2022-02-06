const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/NotFoundError');

const { validateUser, validateLogin } = require('./middlewares/requestValidation');

const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use('/', auth, usersRoutes);
app.use('/', auth, cardRoutes);
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
