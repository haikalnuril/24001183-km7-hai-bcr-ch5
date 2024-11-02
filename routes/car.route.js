const router = require('express').Router();

const { carController } = require('../controllers');
const { adminMiddleware, protectedMiddleware } = require('../middlewares/auth.middleware');

router.get('', protectedMiddleware, carController.getCars);
router.get('/all', protectedMiddleware, adminMiddleware, carController.getAllCars);
router.get('/:id', protectedMiddleware, adminMiddleware, carController.getCarById);
router.post('', protectedMiddleware, adminMiddleware, carController.createCar);
router.put('/:id', protectedMiddleware, adminMiddleware, carController.updateCar);
router.delete('/:id', protectedMiddleware, adminMiddleware, carController.deleteCar);

module.exports = router;