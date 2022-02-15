const HTTP_BAD_REQUEST = 400;

const checkEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  const validEmail = email.includes('@' && '.com');

  if (!validEmail) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = checkEmail;