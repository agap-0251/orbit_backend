const express = require('express')
const {getFullTranscationDetails,getTransactionDetails} = require('../controllers/transaction.controller')
const router = express.Router();

router.get("/:id",getTransactionDetails);
router.get("/",getFullTranscationDetails);

module.exports = router