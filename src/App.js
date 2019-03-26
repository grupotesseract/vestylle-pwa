import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { UserProvider } from './UserContext';
import './App.css';
import MeuPerfil from './pages/MeuPerfil';
import ProtectedRoute from './ProtectedRoute';

class App extends Component {
  render() {
    return <div className="App">
      <UserProvider>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/login" component={Login}/>
          <ProtectedRoute path="/meuperfil" component={MeuPerfil} />
        </Switch>
      </UserProvider>
    </div>;
  }
}

export default App;
