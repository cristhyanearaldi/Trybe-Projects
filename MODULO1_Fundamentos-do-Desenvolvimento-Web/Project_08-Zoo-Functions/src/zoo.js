const { species, employees, hours, prices } = require('./data');
const data = require('./data');

// 1 - Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.
function getSpeciesByIds(...rest) {
  return species.filter((specie) => rest.includes(specie.id));
}
// console.log(getSpeciesByIds());
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

// utilizado filter pois busco elementos que atendem a minha condição e retorno esperado é um array
// O método includes() determina se os parâmetros, passados como array pelo rest, contêm um determinado elemento, no caso, os ids.
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

// ====================

// 2 - Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
function getAnimalsOlderThan(animal, age) {
  const findAnimal = species.find((specie) => specie.name === animal);
  return findAnimal.residents.every((resident) => resident.age >= age);
}
// console.log(getAnimalsOlderThan('otters', 7));
// console.log(getAnimalsOlderThan('penguins', 10));

// utilizado find para buscar o animal passado como parâmetro
// utilizado every pois busco encontrar todos os residentes daquela sp que atendem a minha condição de idade mínima, e quero retornar booleano

// ====================

// 3 - Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas
function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const collabPeople = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return collabPeople;
}
// console.log(getEmployeeByName());
// console.log(getEmployeeByName('Emery'));
// console.log(getEmployeeByName('Wishart'));

// ====================

// 4 - A função, a partir de informações recebidas nos parâmetros, é capaz de criar um objeto equivalente ao de uma pessoa colaboradora, retornando-o
function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}
// sendo que personalInfo e associatedWith são objetos, posso acessar suas propriedades pelo ponto.

// ====================

// 5 - Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

// utilizado some pois avalia se (ao menos) 1 id corresponde ao parâmetro, além disso, preciso retornar um valor booleano.
// utilizado o método includes() para verificar se a chave managers (cujo valor é um array) inclui o id passado como parâmetro da função.

// ====================

// 6 - A função irá adicionar uma nova pessoa colaboradora ao array employees, presente no arquivo data.js.
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmp = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmp);
}
// utilizado object property shorthand, pois key da propriedade é igual ao parâmetro passado
// utilizados default parameters, pois informação sobre managers e responsibleFor nem sempre existente (ou mais de uma)

// ====================

// 7 - Esta função é responsável por contabilizar a quantidade de animais.
function countAnimals(species1) {
  if (species1 === undefined) {
    return species.reduce((acc, currValue) => {
      acc[currValue.name] = currValue.residents.length;
      return acc;
    }, {});
  }
  return species.find((specie) => specie.name === species1).residents.length;
}

// console.log(countAnimals());
// console.log(countAnimals('lions'));

// utilizada HOF reduce() pois seleciona apenas a informação de interesse e posso retornar na forma de objeto
// Agradeço ao Matheus Martino pelo auxílio na lógica da linha 91

// ====================

// 8 - A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado
function calculateEntry(entrants) {
  if (entrants === undefined) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalReceived = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return totalReceived;
}
// console.log(calculateEntry());
// console.log(calculateEntry({}));
// console.log(calculateEntry({ Adult: 2, Child: 3, Senior: 1 }));

// utilizada a desestruturação de entrants para acessar cada chave e já utilizando parâmetro default = 0, caso algum dos valores (número de entradas de Adult, Child, Senior) não seja passado.

function getAnimalMap(options) {
  // seu código aqui
}

// ====================

// 10 -  A função é responsável por disponibilizar as informações de horário para uma consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas o cronograma de um dia específico
function getSchedule(dayName) {
  const weekSchedule = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === undefined) return weekSchedule;
  return {
    [dayName]: weekSchedule[dayName],
  };
}

// console.log(getSchedule());
// console.log(getSchedule('Monday'));
// console.log(getSchedule('Tuesday'));

// utilizada bracket notation para acessar a chave dinamicamente, para cada uma das entradas do objeto.
// Necessário melhorar este requisito. Foram feitas diversas tentativas com object.entries, map() e reduce().

// ====================

// 11 - A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro
function getOldestFromFirstSpecies(id) {
  const caregiver = employees.find((employee) => id === employee.id).responsibleFor[0];
  const wichAnimals = species.find((specie) => caregiver === specie.id).residents;
  const olderAnimal = wichAnimals.sort((residentA, residentB) => residentB.age - residentA.age)[0];
  return Object.values(olderAnimal);
}

// console.log(getOldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

// ====================

// 12 - A função é responsável por aumentar o preço das visitas, com base no valor de aumento recebido no parâmetro, em porcentagem
function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  prices.Adult = Math.round((Adult + (Adult * (percentage / 100))) * 100) / 100;
  prices.Senior = Math.round((Senior + (Senior * (percentage / 100))) * 100) / 100;
  prices.Child = Math.round((Child + (Child * (percentage / 100))) * 100) / 100;
  return prices;
}

// console.log(increasePrices(50));
// console.log(increasePrices(30));

// Math.round: arredonda sem casas decimais. Solução: a) multiplico de acordo com o número de casas decimais que quero apresentar (no requisito quero deixar com 2 casas, então: * 100), b) aplico o Math.round, c) divido de acordo com o mesmo número de casas decimais (/ 100).

// ====================

// 13 - A função é responsável por consultar as espécies pela qual a pessoa colaborada, recebida no parâmetro através de seu id, firstName ou lastName, é responsável
function getAllEmployees() {
  const allEmployees = employees.reduce((acc, employee) => {
    acc[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor
      .map((resp) => species.find((specie) => resp === specie.id).name);
    return acc;
  }, {});
  return allEmployees;
}

function getOneEmployee(idOrName) {
  const getEmployee = employees.find(({ id, firstName, lastName }) => idOrName === id
    || idOrName === firstName || idOrName === lastName);
  // console.log(getEmployee.responsibleFor);
  const listAnimals = getEmployee.responsibleFor.map((animalID) => species
    .find((specie) => animalID === specie.id)) // traz um array de objetos, estes objetos são cada uma das espécies de animais, contendo descrições e indivíduos
    .map((animal) => animal.name); // traz um array com as espécies pela chave "name"
  // console.log(listAnimals);
  const emplName = `${getEmployee.firstName} ${getEmployee.lastName}`;
  return { [emplName]: listAnimals };
}

function getEmployeeCoverage(idOrName) {
  return !idOrName
    ? getAllEmployees()
    : getOneEmployee(idOrName);
}
// console.log(getEmployeeCoverage());
// getEmployeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad');

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
