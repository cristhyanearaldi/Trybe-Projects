const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { validateCategory } = require('../middlewares/categoryValidation');

const router = express.Router({ mergeParams: true });

router.post('/', validateCategory, verifyAuth, categoriesController.create);
router.get('/', verifyAuth, categoriesController.getAll);

module.exports = router;