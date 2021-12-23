const endpoint = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyApi = async () => {
  const response = await fetch(endpoint);
  const json = await response.json();
  const sucesso = response.ok ? Promise.resolve(json) : Promise.reject(json);
  return sucesso;
};

export default getCurrencyApi;
// Source: 'https://github.com/tryber/sd-013-b-live-lectures/pull/43/files'
