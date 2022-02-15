const productsModel = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');
const errorConstructor = require('../utils/errorConstructor');
const { 
  HTTP_CONFLICT,
  HTTP_NOT_FOUND,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST,
} = require('../utils/statusCodes');

const readProducts = async () => {
  const products = await productsModel.readProducts();
  return products;
};

const validadeProducts = ({ name, quantity }) => {
  const { error } = productsSchema.validate({ name, quantity });

  let errorStatus = HTTP_UNPROCESSABLE_ENTITY;
  if (error 
    && (error.message === '"quantity" is required' || error.message === '"name" is required')) {
    errorStatus = HTTP_BAD_REQUEST;
  }

  if (error) throw errorConstructor(errorStatus, error.message);
};

const create = async ({ name, quantity }) => {
  validadeProducts({ name, quantity });

  const existingProduct = await productsModel.getByName(name);

  if (existingProduct) {
    return { status: HTTP_CONFLICT, message: 'Product already exists' };
  }

  const products = await productsModel.create({ name, quantity });
  return {
    id: products.id,
    name,
    quantity,
  };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return { status: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  return {
    ...product,
  };
};

const update = async ({ id, name, quantity }) => {
  validadeProducts({ name, quantity });

  const product = await productsModel.update({ id, name, quantity });

  if (!product) {
    return { status: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  return {
    id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const existingProduct = await productsModel.getById(id);

  const product = await productsModel.remove(id);

  if (!product) {
    return { status: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  return existingProduct;
};

module.exports = {
  readProducts,
  create,
  getById,
  update,
  remove,
};