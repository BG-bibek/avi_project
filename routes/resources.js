const express = require('express');
const router = express.Router();
const resources = require('../controllers/resources');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateResource } = require('../middleware');
const cloudinary = require("../helper/cloudinary");
const upload = require("../helper/multer");

router.route('/')
    .get(catchAsync(resources.index))
    .post(isLoggedIn, upload.single('resource[image]') ,catchAsync(resources.createResource))

router.get('/new', isLoggedIn, resources.renderNewForm)

router.route('/:id')
    .get(catchAsync(resources.showResource))
    .put(isLoggedIn, isAuthor, upload.single('resource[image]'), catchAsync(resources.updateResource))
    .delete(isLoggedIn, isAuthor, catchAsync(resources.deleteResource));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(resources.renderEditForm))

module.exports = router;


