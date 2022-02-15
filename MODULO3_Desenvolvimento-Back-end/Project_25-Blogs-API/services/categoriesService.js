const { Category } = require('../models');

const create = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};
