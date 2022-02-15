const HTTP_OK_STATUS = 200;

const generateToken = (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
};

module.exports = generateToken;