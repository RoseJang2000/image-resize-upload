const { create, getImage, deleteImage, patchImage } = require('../controller/imgController');
const express = require('express');
const router = express.Router();

router.post('/', create);

router.get('/', getImage);

router.delete('/', deleteImage);

router.patch('/', patchImage);

module.exports = router;
