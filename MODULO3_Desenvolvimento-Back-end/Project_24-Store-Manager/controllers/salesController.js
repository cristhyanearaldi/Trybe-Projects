const salesService = require('../services/salesService');
const { HTTP_CREATED, HTTP_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const newSale = req.body;

  try {
    const sales = await salesService.create(newSale);
    return res.status(HTTP_CREATED).json(sales);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(HTTP_OK).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await salesService.getById(id);
    
    if (sale.status && sale.message) {
      return res.status(sale.status).json({ message: sale.message });
    }

    return res.status(HTTP_OK).json(sale);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;

  try {
    const updatedSale = await salesService.update(sale, id);
    return res.status(HTTP_OK).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};