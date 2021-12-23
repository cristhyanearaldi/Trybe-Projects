import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginInfo as loginInfoAction } from '../actions';
import './login.css';
import logoTrybewallet from '../logo-trybeWallet.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validData: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    },
    () => {
      this.enableButton();
    });
  }

  enableButton() {
    const { email, password } = this.state;
    const MINIMUM_CHARACTERS = 6;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email);
    // const validEmail = document.getElementById('form-login').checkValidity();
    const validPassword = password.length >= MINIMUM_CHARACTERS;
    if (validEmail && validPassword) {
      this.setState({
        validData: true,
      });
    }
  }
  // Source: "https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e"

  handleClick() {
    const { email } = this.state;
    const { loginInfo } = this.props;
    loginInfo(email);
  }

  render() {
    const { email, password, validData } = this.state;
    return (
      <form id="form-login">
        <fieldset className="form-login">
          <img src={ logoTrybewallet } alt="Logo Trybe Wallet" className="img-login" />
          <legend>Faça seu login</legend>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              placeholder="Digite seu e-mail"
              data-testid="email-input"
              className="field-login"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              placeholder="Digite sua senha"
              data-testid="password-input"
              className="field-login"
              onChange={ this.handleChange }
            />
          </label>
        </fieldset>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !validData }
            className="btn-config btn btn-success"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  loginInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginInfo: (payload) => dispatch(loginInfoAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
