const router = require('express').Router();

const User = require('./user.route')

router.use('/users', User)

module.exports = router;