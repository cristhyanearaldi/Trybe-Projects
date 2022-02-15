const fs = require('fs').promises;

const HTTP_NO_CONTENT = 204;

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);
  
  const talkerIndex = readTalkers.findIndex((talker) => talker.id === +id);

  readTalkers.splice(talkerIndex, 1);

  await fs.writeFile('./talker.json', JSON.stringify(readTalkers));

  res.status(HTTP_NO_CONTENT).end();
};

module.exports = deleteTalker;