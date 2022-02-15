const categoriesService = require('../services/categoriesService');
const { HTTP_CREATED, HTTP_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCategory = await categoriesService.create({ name });
    return res.status(HTTP_CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await categoriesService.getAll();

    return res.status(HTTP_OK).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};