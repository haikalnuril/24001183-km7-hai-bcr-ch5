const router = require('express').Router();
const { authController } = require('../controllers');
const { protectedMiddleware } = require('../middlewares/auth.middleware');


router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/current-user', protectedMiddleware, authController.currentUser);

module.exports = router;