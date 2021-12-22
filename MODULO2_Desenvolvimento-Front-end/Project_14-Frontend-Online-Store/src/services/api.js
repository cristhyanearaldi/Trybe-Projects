export async function getCategories() {
  const endpoint = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = endpoint.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = endpoint.json();
  return response;
}
