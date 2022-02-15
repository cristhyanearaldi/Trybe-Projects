const fs = require('fs').promises;

const HTTP_CREATED = 201;

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const result = await fs.readFile('./talker.json', 'utf-8');
  const readTalkers = await JSON.parse(result);
  
  const newTalker = {
    id: readTalkers.length + 1,
    name, 
    age,
    talk,
  };
  
  readTalkers.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(readTalkers));

  res.status(HTTP_CREATED).json(newTalker);
};

module.exports = createTalker;