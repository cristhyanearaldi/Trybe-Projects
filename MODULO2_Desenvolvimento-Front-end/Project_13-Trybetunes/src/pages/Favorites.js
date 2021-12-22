import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Favoritas</h3>
      </div>
    );
  }
}

export default Favorites;
