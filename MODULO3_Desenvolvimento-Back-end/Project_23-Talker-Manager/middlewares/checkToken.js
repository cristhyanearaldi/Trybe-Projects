const HTTP_UNAUTHORIZED = 401;
const NUM_CHARACTERS = 16;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== NUM_CHARACTERS) {
    return res.status(HTTP_UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = checkToken;