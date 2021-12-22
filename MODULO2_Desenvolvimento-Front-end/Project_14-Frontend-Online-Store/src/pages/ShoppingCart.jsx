import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import {
  readShoppingCart,
  removeProduct,
  decreaseItem,
  addToLocalStorage,
} from '../services/addToLocalStorage';
import shopp from '../images/shopp.png';
import close from '../images/close.png';
import minus from '../images/minus.png';
import cartImage from '../images/shopping-cart.png';
import add from '../images/add.png';
import '../css/ShoppingCart.css';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentDidMount() {
    this.cartLength();
  }

  handleRemoveClick(product) {
    removeProduct(product);
    this.setState({ cart: readShoppingCart() });
  }

  handleDecrease(product) {
    if (product.amount === 1) {
      this.handleRemoveClick(product);
    } else {
      decreaseItem(product);
      this.setState({ cart: readShoppingCart() });
    }
  }

  handleIncrease(product) {
    if (product.amount <= product.available_quantity) {
      addToLocalStorage(product);
      this.setState({ cart: readShoppingCart() });
    }
  }

  handlePriceItem({ price, amount }) {
    const totalPriceItem = price * amount;
    const realTotalPriceItem = totalPriceItem.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL' });
    return realTotalPriceItem;
  }

  handleTotalPrice(products) {
    const totalPrice = products.reduce((acc, curr) => acc + curr.amount * curr.price, 0);
    const realTotalPrice = totalPrice.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL' });
    return realTotalPrice;
  }

  cartLength = () => {
    this.setState({ cart: readShoppingCart() });
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="body">
        <header>
          <div className="header-content">
            <Link to="/">
              <BsArrow90DegLeft size="30" />
            </Link>
            <div className="cartTitle">
              <img src={ cartImage } width="30px" alt="Carrinho de Compras" />
              <h1>Carrinho de compras</h1>
            </div>
            <img src={ shopp } alt="Online shopp" width="50px" />
          </div>
        </header>
        <div>
          {cart.length === 0 ? (
            <div className="emptyCart">
              <h1
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio &#128546;
              </h1>
              <p>
                Existem milhares de produtos te esperando,
                não perca a oportunidade de comprá-los!
              </p>
            </div>
          ) : (
            <div className="productsCart">
              {cart.map((product) => (
                <div
                  className="productCart"
                  key={ product.id }
                  data-testid="shopping-cart-product-name"
                >
                  <button
                    type="button"
                    className="removeItemBtn"
                    onClick={ () => this.handleRemoveClick(product) }
                  >
                    <img src={ close } alt="remover produto" width="30px" />
                  </button>
                  <img src={ product.thumbnail } alt={ product.title } width="150px" />
                  <p className="productTitle">{ product.title }</p>
                  <div className="handle-amount">
                    <span className="input-group-btn">
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => this.handleDecrease(product) }
                        className="btn btn-danger btn-number"
                      >
                        <img src={ minus } alt="diminuir a quantidade" width="15px" />
                      </button>
                    </span>
                    <p
                      data-testid="shopping-cart-product-quantity"
                      className="amount-value"
                    >
                      { product.amount }
                    </p>
                    <span className="input-group-btn">
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        className="btn btn-success btn-number"
                        disabled={ product.amount === product.available_quantity }
                        onClick={ () => this.handleIncrease(product) }
                      >
                        <img src={ add } alt="aumentar a quantidade" width="15px" />
                      </button>
                    </span>
                    <div className="itemPrice">{this.handlePriceItem(product)}</div>
                  </div>
                </div>
              ))}
              <div className="checkoutPart">
                <h4
                  className="total"
                >
                  {`Valor Total da Compra: ${this.handleTotalPrice(cart)}`}
                </h4>
                <Link to="/checkout">
                  <button
                    type="button"
                    data-testid="checkout-products"
                    className="btn btn-success checkout-btn"
                  >
                    Finalizar Compra
                  </button>
                </Link>
              </div>
            </div>
          )}
          <footer>
            <p>
              Todos os direitos reservados para o Grupo 24, composto pelos incríveis devs:
              <br />
              Cristhyane Araldi, Écio Ferraz, Gabriel Benedetti, Lys Prestes e Yan Paroni
            </p>
          </footer>
        </div>
      </div>);
  }
}
