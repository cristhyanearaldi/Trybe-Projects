import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class Switcher extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/album/:id" component={ Album } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
        {/* Caso não seja feito matching com nenhuma rota anterior, ele chega nessa rota e renderiza o component NotFound.
        Source: "https://reactrouter.com/web/example/no-match" */}
      </Switch>
    );
  }
}

export default Switcher;
