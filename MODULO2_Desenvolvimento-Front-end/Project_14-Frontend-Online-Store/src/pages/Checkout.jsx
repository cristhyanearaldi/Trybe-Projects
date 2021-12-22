import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { readShoppingCart } from '../services/addToLocalStorage';
import '../css/Checkout.css';

import shopp from '../images/shopp.png';

export default class Checkout extends React.Component {
  render() {
    const cart = readShoppingCart();
    return (
      <section>
        <header>
          <div className="header-content">
            <Link to="/shopping-cart">
              <BsArrow90DegLeft size="30" />
            </Link>
            <div className="checkout-title">
              <h1>Checkout</h1>
            </div>
            <img src={ shopp } alt="Online shopp" width="50px" />
          </div>
        </header>
        <fieldset className="scheduler-border1">
          <legend className="scheduler-border2">Revise seus Produtos</legend>
          {cart.map(({ thumbnail, title, amount, price, id }) => (
            <div key={ id } className="checkout-products">
              <img src={ thumbnail } alt={ title } />
              <div>
                <h6>{title}</h6>
                <p>
                  { `Quantidade: ${amount} Preço: ${
                    price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                  }` }
                </p>
              </div>
            </div>
          ))}
        </fieldset>
        <form className="form-inline">
          <fieldset className="scheduler-border1">
            <legend className="scheduler-border2">Informações do Comprador</legend>
            <label htmlFor="name" className="control-label">
              Nome
              <input
                type="text"
                name="name"
                id="name"
                data-testid="checkout-fullname"
                placeholder="Digite seu nome completo"
                size="30"
                className="form-control"
              />
            </label>

            <label htmlFor="email" className="control-label">
              Email
              <input
                type="email"
                name="email"
                id="email"
                data-testid="checkout-email"
                placeholder="Digite seu email"
                className="form-control"
              />
            </label>

            <label htmlFor="cpf" className="control-label">
              CPF
              <input
                type="text"
                name="cpf"
                id="cpf"
                data-testid="checkout-cpf"
                placeholder="Digite seu CPF"
                className="form-control"
              />
            </label>
            <label htmlFor="phone" className="control-label">
              Telefone
              <input
                type="text"
                name="phone"
                id="phone"
                data-testid="checkout-phone"
                placeholder="Digite seu número de telefone"
                className="form-control"
              />
            </label>

            <label htmlFor="cep" className="control-label">
              CEP
              <input
                type="text"
                name="cep"
                id="cep"
                data-testid="checkout-cep"
                placeholder="Digite seu CEP"
                className="form-control"
              />
            </label>

            <label htmlFor="adress" className="control-label">
              Endereço
              <input
                type="text"
                name="adress"
                id="adress"
                data-testid="checkout-address"
                placeholder="Digite seu endereço completo"
                className="form-control"
              />
            </label>
          </fieldset>
          <button type="button" className="btn btn-primary btn-checkout">
            Comprar
          </button>
        </form>
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
