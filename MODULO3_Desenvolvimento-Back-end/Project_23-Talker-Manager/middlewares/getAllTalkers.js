const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const getAllTalkers = async (_req, res) => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);

  if (!readTalkers || readTalkers.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  
  res.status(HTTP_OK_STATUS).json(readTalkers);
};

module.exports = getAllTalkers;