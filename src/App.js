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
import Produtos from './pages/Produtos';
import ProdutosDetalhe from './pages/ProdutosDetalhe';
import AdicionarCupom from './pages/AdicionarCupom';
import FaleConosco from './pages/FaleConosco';
import Loja from './pages/Loja';
import MeusCupons from './pages/MeusCupons';
import CupomDetalhe from './pages/CupomDetalhe';
import ReactGA from 'react-ga';
import PrivacyPolicy from './pages/PrivacyPolicy';

class App extends Component {

  componentWillMount() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_UA, {
      debug: true,
      titleCase: false,
    });
  }
  render() {
    return <div className="App">
      <LojaProvider>
        <UserProvider>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/privacypolicy" component={PrivacyPolicy}/>
            <Route exact={true} path="/login" component={Login}/>
            <Route exact={true} path="/cadastro" component={Cadastro}/>
            <Route exact={true} path="/esqueceusenha" component={EsqueceuSenha}/>
            <Route exact={true} path="/cadastrosimples" component={CadastroSimples}/>
            <Route exact={true} path="/produtos" component={Produtos}/>
            <Route exact={true} path="/produtos/:produtoId" component={ProdutosDetalhe}/>
            <ProtectedRoute exact={true} path="/areacliente" component={AreaCliente}/>
            <ProtectedRoute exact={true} path="/meuspontos" component={MeusPontos}/>
            <ProtectedRoute exact={true} path="/meuperfil" component={MeuPerfil} />
            <Route exact={true} path="/listadesejos" component={ListaDesejos} />
            <ProtectedRoute exact={true} path="/adicionarcupom" component={AdicionarCupom} />
            <ProtectedRoute path="/adicionarcupom/:codigoCupom" component={AdicionarCupom} />
            <ProtectedRoute path="/cupom/:cupomId" component={CupomDetalhe} />
            <ProtectedRoute path="/meuscupons" component={MeusCupons} />
            <Route exact={true} path="/faleconosco" component={FaleConosco} />
            <Route exact={true} path="/loja" component={Loja} />
          </Switch>
        </UserProvider>
      </LojaProvider>
    </div>;
  }
}

export default App;
