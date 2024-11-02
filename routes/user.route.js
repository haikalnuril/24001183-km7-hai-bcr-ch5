const router = require('express').Router();

const { userController } = require('../controllers');
const {protectedMiddleware, adminMiddleware, superAdminMiddleware} = require('../middlewares/auth.middleware')

router.get('', protectedMiddleware, userController.getUsers);
router.post('', protectedMiddleware, superAdminMiddleware, userController.createUser);
router.delete('/:id', protectedMiddleware, userController.deleteUser);

module.exports = router;