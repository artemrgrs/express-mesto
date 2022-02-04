const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Невалидный id профиля'));
        return;
      }
      next(err);
    });
};

const getProfile = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError();
      } else if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id профиля'));
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = { ...req.body };

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Указаны неверные данные');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Невалидный id профиля');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError();
      } else next(err);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('Email или пароль отсутствует');
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Такого пользователя нет');
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неверный логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            })
            .send({ message: 'Успешно!' });
        });
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createUser, updateUser, updateAvatar, login, getMyProfile,
};
