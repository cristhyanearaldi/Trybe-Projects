import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getCurrencyApiThunk } from '../actions';

class SelectCurrency extends React.Component {
  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  render() {
    const { handleChange, currencies } = this.props;
    const responseFiltered = currencies
      .filter((currency) => (currency !== 'USDT'));
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          onChange={ handleChange }
        >
          { responseFiltered.map((currency) => (
            <option key={ currency } value={ currency }>{ currency }</option>
          )) }
        </select>
      </label>
    );
  }
}

SelectCurrency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  setCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(getCurrencyApiThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
