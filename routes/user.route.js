const router = require('express').Router();

const { userController } = require('../controllers');
const {protectedMiddleware, adminMiddleware, superAdminMiddleware} = require('../middlewares/auth.middleware')

router.get('', protectedMiddleware, adminMiddleware, userController.getUsers);
router.get('/:id', protectedMiddleware, adminMiddleware, userController.getUserById);
router.post('', protectedMiddleware, superAdminMiddleware, userController.createUser);
router.put('/:id', protectedMiddleware, superAdminMiddleware, userController.updateUser);
router.delete('/:id', protectedMiddleware, superAdminMiddleware, userController.deleteUser);

module.exports = router;