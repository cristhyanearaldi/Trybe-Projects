const { HTTP_INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  
  res.status(HTTP_INTERNAL_SERVER_ERROR).json({ 
    error: {
      message: 'Internal Server Error',
    },
  });
};

module.exports = errorMiddleware;