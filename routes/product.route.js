const express = require('express');
const router = express.Router();
const product_controller = require('../controller/product.controller');


router.post('/create', product_controller.create);

router.get('/get', product_controller.get);

router.post('/update', product_controller.update);

router.post('/delete', product_controller.delete);

module.exports = router;