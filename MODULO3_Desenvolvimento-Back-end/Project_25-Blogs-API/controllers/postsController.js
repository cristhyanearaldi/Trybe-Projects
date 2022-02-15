const postsService = require('../services/postsService');
const { HTTP_CREATED, HTTP_OK, HTTP_NO_CONTENT } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  try {
    const newPost = await postsService.create({ title, content, id });
    return res.status(HTTP_CREATED).json(newPost);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const posts = await postsService.getAll();
    return res.status(HTTP_OK).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await postsService.getById({ id });
    return res.status(HTTP_OK).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const post = await postsService.update(id, title, content);
    return res.status(HTTP_OK).json(post);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    await postsService.remove(req.user.id, id);
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};