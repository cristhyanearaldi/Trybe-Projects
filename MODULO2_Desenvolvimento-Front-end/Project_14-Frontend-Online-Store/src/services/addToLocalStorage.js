const SHOPPING_CART_KEY = 'shopping-cart';

if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

export const readShoppingCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));

const saveShoppingCart = (cartItems) => (
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cartItems))
);

export const addToLocalStorage = (item) => {
  const NOT_IN_STORAGE = -1;
  if (item) {
    const cart = readShoppingCart();
    const index = cart.findIndex(({ id }) => id === item.id);
    if (index === NOT_IN_STORAGE) {
      item.amount = 1;
      saveShoppingCart([...cart, item]);
    } else {
      cart[index].amount += 1;
      saveShoppingCart(cart);
    }
  }
};

export const removeProduct = (product) => {
  const cartItems = readShoppingCart();
  saveShoppingCart(cartItems.filter((item) => item.id !== product.id));
};

export const decreaseItem = (product) => {
  const cartItems = readShoppingCart();
  const itemFinded = cartItems.find((item) => item.id === product.id);
  itemFinded.amount -= 1;
  saveShoppingCart(cartItems);
};
