const usersService = require('../services/usersService');
const { HTTP_CREATED, HTTP_OK, HTTP_NO_CONTENT } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  try {
    const newUser = await usersService.create({ displayName, email, password, image });
    return res.status(HTTP_CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    return res.status(HTTP_OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await usersService.getById({ id });
    return res.status(HTTP_OK).json(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.user;

  try {
    await usersService.remove(id);
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};