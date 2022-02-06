const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/requestValidation');

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', validateCard, createCard);

router.delete('/cards/:cardId', validateId, deleteCard);

router.put('/cards/:cardId/likes', validateId, putLike);

router.delete('/cards/:cardId/likes', validateId, deleteLike);

module.exports = router;
