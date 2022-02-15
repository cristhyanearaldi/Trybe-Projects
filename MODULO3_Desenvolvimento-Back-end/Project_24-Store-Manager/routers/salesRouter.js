const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router({ mergeParams: true });

router.get('/', salesController.getAll);

router.post('/', salesController.create);

router.get('/:id', salesController.getById);

router.put('/:id', salesController.update);

module.exports = router;