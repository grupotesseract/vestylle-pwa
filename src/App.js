import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { LojaProvider } from './LojaContext';
import { UserProvider } from './UserContext';
import './App.css';
import MeuPerfil from './pages/MeuPerfil';
import ProtectedRoute from './ProtectedRoute';
import Cadastro from './pages/Cadastro';
import CadastroSimples from './pages/CadastroSimples';
import AreaCliente from './pages/AreaCliente';
import MeusPontos from './pages/MeusPontos';
import EsqueceuSenha from './pages/EsqueceuSenha';
import ListaDesejos from './pages/ListaDesejos';

class App extends Component {
  render() {
    return <div className="App">
      <LojaProvider>
        <UserProvider>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/login" component={Login}/>
            <Route exact={true} path="/cadastro" component={Cadastro}/>
            <Route exact={true} path="/esqueceusenha" component={EsqueceuSenha}/>
            <Route exact={true} path="/cadastrosimples" component={CadastroSimples}/>
            <ProtectedRoute exact={true} path="/areacliente" component={AreaCliente}/>
            <ProtectedRoute exact={true} path="/meuspontos" component={MeusPontos}/>
            <ProtectedRoute exact={true} path="/meuperfil" component={MeuPerfil} />
            <Route exact={true} path="/listadesejos" component={ListaDesejos} />
          </Switch>
        </UserProvider>
      </LojaProvider>
    </div>;
  }
}

export default App;
