const HTTP_BAD_REQUEST = 400;

const checkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const regex = /^\d{2}\/\d{2}\/\d{4}$/; 
  
  const validDate = regex.test(watchedAt);
  
  if (!validDate) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

module.exports = checkWatchedAt;

// Source regex: 'https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy'