const express = require('express');
const postsController = require('../controllers/postsController');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { 
  validatePost, 
  validateCategory, 
  validatePostExists, 
  validateUpdatedPost,
  validateUpdatedCategory,
  validateAuthorizedUser,
} = require('../middlewares/postValidation');

const router = express.Router({ mergeParams: true });

router.post('/', verifyAuth, validatePost, validateCategory, postsController.create);
router.get('/', verifyAuth, postsController.getAll);
router.get('/:id', verifyAuth, validatePostExists, postsController.getById);
router.put('/:id', 
  verifyAuth, 
  validateUpdatedCategory, 
  validateUpdatedPost, 
  validateAuthorizedUser, 
  postsController.update);
router.delete('/:id', 
  verifyAuth,
  validatePostExists,
  validateAuthorizedUser,
  postsController.remove);

module.exports = router;