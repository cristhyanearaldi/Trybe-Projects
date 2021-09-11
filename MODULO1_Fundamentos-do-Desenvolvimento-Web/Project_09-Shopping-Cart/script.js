const cartItems = document.querySelector('.cart__items');
const endpoint1 = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const endpoint2 = 'https://api.mercadolibre.com/items/';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Requisito 4 parte 1
const saveCart = () => {
  // localStorage.setItem('savedCartItems', JSON.stringify(cartItems.innerHTML));
  localStorage.setItem('savedCartItems', cartItems.innerHTML); // setItem armazena/salva um item no local storage
};
// Source: https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045

// Requisito 7
const loadingElement = (() => {
  const body = document.querySelector('body');
  const createdElement = document.createElement('span');
  createdElement.className = 'loading';
  body.insertAdjacentElement('afterbegin', createdElement); // posicionando novo elemento como primeiro filho de body
});
loadingElement();
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement

// Requisito 1
const getItems = async () => {
  const loading = document.querySelector('.loading');
  loading.innerText = 'loading...'; // adiciona mensagem enquanto a página é carregada
  const query = 'computador';
  // const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const request = await fetch(`${endpoint1}${query}`);
  const response = await request.json();
  const getResult = response.results;

  const items = document.querySelector('.items');
  getResult.forEach(({ title, id, thumbnail }) => {
    items.appendChild(createProductItemElement({
      name: title,
      sku: id,
      image: thumbnail,
    }));
  });
  loading.remove(); // remove a mensagem ao finaliza o carregamento da página
};
// Agradeço ao Matheus Martino pela monitoria de revisão do Bloco 9!

// Requisito 5
const createTotalPrice = (() => {
  const cart = document.querySelector('.cart');
  const divPrice = document.createElement('div');
  divPrice.className = 'div-price';
  cart.appendChild(divPrice);

  const totalPriceParent = document.createElement('span');
  totalPriceParent.className = 'total-price-parent';
  divPrice.appendChild(totalPriceParent);

  const totalPriceElement = document.createElement('span');
  totalPriceElement.className = 'total-price';
  divPrice.appendChild(totalPriceElement);

  totalPriceParent.innerText = 'Preço total: ';
});
createTotalPrice();

const totalPrice = (() => {
  const actualPrice = document.querySelector('.total-price');
  const cartItem = document.querySelectorAll('.cart__item');
  let sumPrices = 0;

  cartItem.forEach((item) => {
  const itemPrice = item.innerText; // innerText retorna o conteúdo de texto especificado 
  const posicaoInicial = itemPrice.indexOf('$') + 1; // indexOf() retorna o índice de $
  const posicaoFinal = itemPrice.length;
  const stringDeInteresse = itemPrice.substr(posicaoInicial, posicaoFinal); // substr() retorna uma parte especificada da string
  const numero = parseFloat(stringDeInteresse); // convertendo a string em número;
  // console.log(numero);
  sumPrices += numero;
  });
  // actualPrice.innerText = `${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
  //   .format(Math.round(sumPrices * 100) / 100)}`;
  actualPrice.innerText = `${(Math.round(sumPrices * 100) / 100)}`;
  saveCart();
});
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substr
// Source: https://www.w3schools.com/jsref/jsref_parsefloat.asp

// Requisito 3
function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
  saveCart();
  totalPrice();
}

// Requisito 4 parte 2
const loadingCart = () => {
  cartItems.innerHTML = localStorage.getItem('savedCartItems'); 
  const cartItem = document.querySelectorAll('.cart__item');
  // getItem recupera ou acessa o item a partir da sua chave
  // .innerHTML troca o conteúdo do elemento pelo que foi salvo no setItem
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2
const addToCart = async () => {
  const itemList = document.querySelectorAll('.item__add');
  // console.log(itemList);
  itemList.forEach((buttonItem) => { // Adicionando um escutador de eventos para cada elemento (botão) da minha lista de itens
    buttonItem.addEventListener('click', async (event) => {
    const itemID = getSkuFromProductItem(event.target.parentElement);
    // const endpoint = `https://api.mercadolibre.com/items/${itemID}`;
    const request = await fetch(`${endpoint2}${itemID}`);
    const response = await request.json();
    const item = { // Adicionando as informações do produto ao carrinho 
      sku: response.id,
      name: response.title,
      salePrice: response.price,
    };
    cartItems.appendChild(createCartItemElement(item));
    saveCart();
    totalPrice();
    });
  });
};

// Requisito 6
const emptyCart = document.querySelector('.empty-cart');
emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.clear();
  totalPrice();
});

window.onload = async () => { // async/await para organizar o tempo entre criar a lista de produtos, adicionar botões e adicionar produtos ao carrinho 
  await getItems(); 
  addToCart();
  loadingCart();
  totalPrice();
};
