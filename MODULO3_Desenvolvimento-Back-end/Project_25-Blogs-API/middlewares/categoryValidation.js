const Joi = require('joi');
const { HTTP_BAD_REQUEST } = require('../utils/statusCodes');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategory = async (req, res, next) => {
  const category = req.body;
  const { error } = categoriesSchema.validate(category);

  if (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.details[0].message });
  }

  return next();
};

module.exports = {
  validateCategory,
};