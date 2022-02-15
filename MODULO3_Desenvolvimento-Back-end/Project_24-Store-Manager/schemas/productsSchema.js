const Joi = require('@hapi/joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 5 characters long',
    'any.required': '"name" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
.messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'any.required': '"quantity" is required',
  }),
});
module.exports = productsSchema;

// Source 1: content about Joi usage discussed with Mayu Satori and Renata Nunes 
// Source 2: video Tiago Mariotto: (https://drive.google.com/file/d/1svtR0cA3Od2X14KgJ-dnRxWF5R_rZJXY/view)