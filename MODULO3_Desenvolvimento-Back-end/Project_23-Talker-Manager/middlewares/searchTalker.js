const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const searchTalker = async (req, res) => {
  const { q } = req.query;

  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);

  const filteredTalkers = readTalkers
    .filter((talker) => talker.name.includes(q));

  res.status(HTTP_OK_STATUS).json(filteredTalkers);
};

module.exports = searchTalker;