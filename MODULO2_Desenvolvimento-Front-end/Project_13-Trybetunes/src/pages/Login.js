import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() { // async/await?
    const { username } = this.state;
    const user = {
      name: username,
    };
    this.setState({
      loading: true,
    });
    createUser(user);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { username, loading, redirect } = this.state;
    const MIN_CHARAC = 3;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              value={ username }
              data-testid="login-name-input"
              id="username"
              placeholder="Usuário"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button" // type submit necessitaria preventDefault
            data-testid="login-submit-button"
            disabled={ username.length < MIN_CHARAC } // Source: "https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js"
            id="entrar"
            onClick={ this.handleClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
