import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, deleteItem } = this.props;
    if (expenses !== undefined) {
      return (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
                  <td>
                    { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    { parseFloat(expense.value
                    * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteItem(expense.id) }
                  >
                    Excluir
                  </button>
                </tr>
              ))
            }
          </tbody>
        </table>
      );
    }
  }
}

ExpensesTable.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
