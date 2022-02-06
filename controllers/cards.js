const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Указаны некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        throw new ForbiddenError('Вы не можете удалить эту карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.status(200).send('Карточка удалена');
        })
        .catch(next);
    })
    .catch(next);
};

// const deleteCard = (req, res, next) => {
//   const owner = req.user._id;
//   Card.findById(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Запрашиваемая карточка не найдена');
//       }
//       Card.findByIdAndRemove(req.params.cardId)
//         .then(() => {
//           if (owner !== card.owner) {
//             throw new ForbiddenError('Вы не можете удалить эту карточку');
//           }
//           res.status(200).send('Карточка удалена');
//         })
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             next(new ValidationError('Невалидный id карточки'));
//             return;
//           }
//           next(err);
//         });
//     })
//     .catch(next);
// };

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Нет карточки по заданному id'));
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Невалидный id карточки'));
        return;
      }
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Нет карточки по заданному id'));
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Невалидный id карточки'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
