import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>Ops!</h1>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
    );
  }
}

export default NotFound;
