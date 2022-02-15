const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

const getTalkerById = async (req, res) => {
  const { id } = req.params;

  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);
    
    const findTalker = readTalkers.find((talker) => talker.id === +id);
    
    if (!findTalker) {
      return res.status(HTTP_NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
    }

  res.status(HTTP_OK_STATUS).json(findTalker);
};

module.exports = getTalkerById;