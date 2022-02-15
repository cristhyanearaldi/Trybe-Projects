const express = require('express');
const checkAge = require('../middlewares/checkAge');
const checkName = require('../middlewares/checkName');
const checkRate = require('../middlewares/checkRate');
const checkTalk = require('../middlewares/checkTalk');
const checkToken = require('../middlewares/checkToken');
const checkWatchedAt = require('../middlewares/checkWatchedAt');
const createTalker = require('../middlewares/createTalker');
const deleteTalker = require('../middlewares/deleteTalker');
const editTalker = require('../middlewares/editTalker');
const getAllTalkers = require('../middlewares/getAllTalkers');
const getTalkerById = require('../middlewares/getTalkerById');
const searchTalker = require('../middlewares/searchTalker');

const router = express.Router();

router.get('/', getAllTalkers);

router.get('/search', checkToken, searchTalker);

router.get('/:id', getTalkerById);

router.post('/', 
  checkToken, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkWatchedAt, 
  checkRate, 
  createTalker);

router.put('/:id', 
  checkToken, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkWatchedAt, 
  checkRate,
  editTalker);

router.delete('/:id', checkToken, deleteTalker);

module.exports = router;