const express = require('express');

const router = express.Router();

router.use('./user',require('./api/user.router'));

module.exports = router;