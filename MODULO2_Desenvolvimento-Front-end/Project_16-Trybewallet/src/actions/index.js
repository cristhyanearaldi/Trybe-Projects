import getCurrencyApi from '../services/currencyAPI';

export const LOGIN_INFO = 'LOGIN_INFO';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const getCurrencyApiSuccess = (payload) => ({
  type: API_SUCCESS,
  payload,
});

export const getCurrencyApiError = (payload) => ({
  type: API_ERROR,
  payload,
});

export const getExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const getCurrencyApiThunk = () => async (dispatch) => {
  try {
    const response = await getCurrencyApi();
    const payload = Object.keys(response);
    dispatch(getCurrencyApiSuccess(payload));
  } catch (error) {
    dispatch(getCurrencyApiError(error));
  }
};
