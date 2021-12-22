import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addToLocalStorage, readShoppingCart } from '../services/addToLocalStorage';
import freeShipping from '../images/free.png';
import cartImage from '../images/shopping-cart.png';
import '../css/ProductCards.css';

export default class ProductCards extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.state = { count: '' };
  }

  componentDidMount() {
    this.handleCart();
  }

  handleCart(title) {
    addToLocalStorage(title);
    const cartItems = readShoppingCart();
    const total = cartItems.reduce((curr, item) => curr + item.amount, 0);
    this.setState({ count: total });
  }

  render() {
    const { products } = this.props;
    const { count } = this.state;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <div className="btn-group cart">
            <div className="btn btn-default">
              <img src={ cartImage } width="30px" alt="Carrinho de Compras" />
              <span data-testid="shopping-cart-size">
                { count }
              </span>
            </div>
          </div>
        </Link>
        <div>
          <div className="products">
            {products.map((item, id) => (
              <div key={ id } data-testid="product" className="product-card">
                <Link
                  data-testid="product-detail-link"
                  to={ {
                    pathname: `/details/${id}`,
                    state: {
                      item,
                      id,
                    },
                  } }
                >
                  <img
                    className="thumbnail"
                    src={ item.thumbnail }
                    alt={ ` imagem ${item.title}` }
                  />
                  { item.shipping.free_shipping ? (
                    <div data-testid="free-shipping">
                      <img src={ freeShipping } alt="Frete Grátis" width="40px" />
                      <span>Frete Grátis</span>
                    </div>
                  ) : (
                    <div />
                  ) }
                  <h4>{item.title}</h4>
                </Link>
                <div className="btn-price-cards">
                  <p>
                    {item.price.toLocaleString('pt-br', {
                      style: 'currency', currency: 'BRL' })}
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.handleCart(item) }
                    disabled={ item.amount === item.available_quantity }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ProductCards.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
