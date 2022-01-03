const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsApi = async () => {
  const response = await fetch(endpoint);
  const json = await response.json();
  const sucesso = response.ok ? Promise.resolve(json) : Promise.reject(json);
  return sucesso;
};

export default planetsApi;
