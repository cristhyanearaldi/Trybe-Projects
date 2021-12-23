import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import SelectCurrency from './SelectCurrency';
import getCurrencyApi from '../services/currencyAPI';
import { getExpenses as getExpensesAction } from '../actions';
import './expensesForm.css';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectFields = this.selectFields.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { getExpenses } = this.props;
    const exchangeRates = await getCurrencyApi();
    this.setState({
      exchangeRates,
    });
    getExpenses(this.state);
  }

  selectFields() {
    const { method, tag } = this.state;
    return (
      <div>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            className="field-form"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            value={ tag }
            className="field-form"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <fieldset className="form-expenses">
          <legend>Despesas</legend>
          <label htmlFor="value">
            Valor
            <input
              type="text"
              id="value"
              name="value"
              value={ value }
              className="field-form"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              className="field-form"
              onChange={ this.handleChange }
            />
          </label>
          <SelectCurrency handleChange={ this.handleChange } />
          <p>{ this.selectFields() }</p>
          <button
            type="button"
            className="btn-config btn btn-secondary"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </fieldset>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  getExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(getExpensesAction(expenses)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
