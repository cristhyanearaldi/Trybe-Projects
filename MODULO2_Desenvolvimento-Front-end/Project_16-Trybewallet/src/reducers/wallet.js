// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_SUCCESS, API_ERROR, ADD_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: null,
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case API_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== Number(action.payload)),
    };
  default:
    return state;
  }
};

export default wallet;
