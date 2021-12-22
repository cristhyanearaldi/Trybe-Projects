import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import {
  readShoppingCart,
  addToLocalStorage,
  decreaseItem,
  removeProduct } from '../services/addToLocalStorage';
import cartImage from '../images/shopping-cart.png';
import freeShipping from '../images/free.png';
import shopp from '../images/shopp.png';
import ProductEvaluation from '../components/ProductEvaluation';
import '../css/ProductDetails.css';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.location.state.item,
      count: '',
      amount: 0,
    };

    this.handleAmount = this.handleAmount.bind(this);
  }

  componentDidMount() {
    this.handleCart();
  }

  handleRemoveClick(product) {
    removeProduct(product);
    this.handleAmount();
    this.handleCart();
  }

  handleDecrease(product) {
    const { amount } = this.state;
    if (amount === 1) {
      this.handleRemoveClick(product);
    } else {
      decreaseItem(product);
      this.handleAmount();
      this.handleCart();
    }
  }

  handleIncrease(product) {
    addToLocalStorage(product);
    this.handleAmount();
    this.handleCart();
  }

  handleAmount() {
    const { item } = this.state;
    const cartItems = readShoppingCart();
    const itemCart = cartItems.find((curr) => curr.id === item.id);
    this.setState({
      amount: itemCart ? itemCart.amount : 0,
    });
  }

  handleCart(title) {
    addToLocalStorage(title);
    const cartItems = readShoppingCart();
    const count = cartItems.reduce((curr, item) => curr + item.amount, 0);
    this.setState({ count });
    this.handleAmount();
  }

  render() {
    const { item, count, amount } = this.state;
    const { title, price, thumbnail, condition, accepts_mercadopago: mPgo } = item;
    return (
      <section className="body">
        <header>
          <div className="header-content">
            <Link to="/">
              <BsArrow90DegLeft size="30" />
            </Link>
            <img src={ shopp } alt="Online shopp" width="50px" />
            <Link to="/shopping-cart" data-testid="shopping-cart-button">
              <img src={ cartImage } width="30px" alt="Carrinho de Compras" />
              <span data-testid="shopping-cart-size">
                { count }
              </span>
            </Link>
          </div>
        </header>
        <div className="product-title">
          <h2 data-testid="product-detail-name">
            {title}
          </h2>
          { item.shipping.free_shipping ? (
            <div data-testid="free-shipping" className="shipping">
              <img src={ freeShipping } alt="Frete Grátis" width="50px" />
              <span>Frete Grátis</span>
            </div>
          ) : (
            <div />
          ) }
        </div>

        <div className="info">
          <img src={ thumbnail } alt={ `Imagem produto ${title}` } />
          <div>
            <h2>Informações do Produto</h2>
            <ul>
              <li>
                {`Preço: ${price.toLocaleString('pt-br', {
                  style: 'currency', currency: 'BRL' })}`}
              </li>
              <li>{`Aceita Mercado Pago: ${mPgo ? 'SIM' : 'NÃO'}`}</li>
              <li>{`Quantidade disponível: ${item.available_quantity}`}</li>
              <li>{`Condição do produto: ${condition === 'new' ? 'Novo' : 'Usado'}`}</li>
            </ul>
          </div>
        </div>
        <div className="btns-cart">
          <div className="handle-amount">
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-danger btn-number"
                data-testid="product-decrease-quantity"
                disabled={ amount === 0 }
                onClick={ () => this.handleDecrease(item) }
              >
                -
              </button>
            </span>
            <p
              data-testid="shopping-cart-product-quantity"
              className="amount-value"
            >
              { amount }
            </p>
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-success btn-number"
                data-testid="product-increase-quantity"
                disabled={ amount === item.available_quantity }
                onClick={ () => this.handleIncrease(item) }
              >
                +
              </button>
            </span>
          </div>
          <button
            type="button"
            className="btn btn-success btn-add-cart"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleCart(item) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <ProductEvaluation className="product-evaluation" />
        <footer>
          <p>
            Todos os direitos reservados para o Grupo 24, composto pelos incríveis devs:
            <br />
            Cristhyane Araldi, Écio Ferraz, Gabriel Benedetti, Lys Prestes e Yan Paroni
          </p>
        </footer>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
