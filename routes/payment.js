const express = require('express');
const router = express.Router();
const payment = require('../controllers/payment');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const cloudinary = require("../helper/cloudinary");
const upload = require("../helper/multer");

const Resource = require('../models/resource');

router.route('/:id')
    .get(catchAsync(payment.index))

module.exports = router;


