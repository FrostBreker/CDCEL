const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const {checkIsAuth} = require('../middlewares/auth.middleware');

//Auth
router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.get('/logout', checkIsAuth, authController.logout);

//User
router.get('/', checkIsAuth, userController.getUser);

module.exports = router;
