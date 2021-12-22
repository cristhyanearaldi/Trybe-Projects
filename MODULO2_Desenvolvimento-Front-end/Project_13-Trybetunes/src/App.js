import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Switcher from './pages/Switcher';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switcher />
      </BrowserRouter>
    );
  }
}

export default App;
