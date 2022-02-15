const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res) => {
  const { id } = req.params;

  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);
 
  const talkerIndex = readTalkers.findIndex((talker) => talker.id === +id);

  const editedTalker = ({ id: +id, ...req.body });

  readTalkers[talkerIndex] = editedTalker;

  await fs.writeFile('./talker.json', JSON.stringify(readTalkers));

  res.status(HTTP_OK_STATUS).json(readTalkers[talkerIndex]);
};

module.exports = editTalker;

// Sources to method findIndex():
// 'https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs/'
// 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex'