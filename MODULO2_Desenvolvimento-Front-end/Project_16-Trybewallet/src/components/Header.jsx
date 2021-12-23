import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    const INITIAL_CURRENCY = 'USD';
    const total = expenses.reduce((acc, expense) => {
      const { exchangeRates, value, currency = INITIAL_CURRENCY } = expense;
      const sum = exchangeRates[currency].ask;
      return acc + (sum * value);
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <span data-testid="email-field" className="field-header">
          Email:
          {' '}
          { email }
        </span>
        <div>
          <span data-testid="total-field" className="field-header">
            Despesa Total: R$
            {' '}
            { this.sumExpenses() }
          </span>
          <span data-testid="header-currency-field" className="field-header">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
