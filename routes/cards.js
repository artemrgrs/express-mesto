const router = require('express').Router();
const { validateCard, validateCardId } = require('../middlewares/requestValidation');

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', validateCard, createCard);

router.delete('/cards/:cardId', validateCardId, deleteCard);

router.put('/cards/:cardId/likes', validateCardId, putLike);

router.delete('/cards/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
