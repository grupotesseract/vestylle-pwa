import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

import './App.css';

class App extends Component {
  render() {
    return <div className="App">
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>;
  }
}

export default App;
