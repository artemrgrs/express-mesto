const router = require('express').Router();

const { validateUserAvatar, validateUserUpdate } = require('../middlewares/requestValidation');

const {
  getUsers, getProfile, updateUser, updateAvatar, getMyProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);

router.get('/users/:userId', getProfile);

router.patch('/users/me', validateUserUpdate, updateUser);

router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
