const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router({ mergeParams: true });

router.get('/', productsController.readProducts);

router.post('/', productsController.create);

router.get('/:id', productsController.getById);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.remove);

module.exports = router;