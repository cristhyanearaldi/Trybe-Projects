import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    this.setState({
      loading: true,
    });
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { loading, name } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
    // renderiza na tela o nome de usuário digitado
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { name }
        </p>
        <p><Link to="/search" data-testid="link-to-search">Pesquisa</Link></p>
        <p><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></p>
        <p><Link to="/profile" data-testid="link-to-profile">Perfil</Link></p>
      </header>
    );
  }
}

export default Header;
