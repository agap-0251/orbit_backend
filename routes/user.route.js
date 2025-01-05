const express = require('express')
const {getUserDetails} = require('../controllers/user.controller')
const router = express.Router();

router.get("/:id",getUserDetails);

module.exports = router
