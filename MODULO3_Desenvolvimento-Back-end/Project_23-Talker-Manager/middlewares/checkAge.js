const HTTP_BAD_REQUEST = 400;

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = checkAge;