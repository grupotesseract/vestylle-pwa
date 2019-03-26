import React, { Component } from 'react';
import { UserConsumer } from '../UserContext';
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return <UserConsumer>
    {({ isAuth, login, logout }) => (<>
      {isAuth ? (
      <>  
        <Link to="/meuperfil"> Meu Perfil </Link>
        <button onClick={logout}>Logout</button>
      </>
      ):(
      <>
        <input type="email" name="password"></input>
        <input type="password" name="password"></input>
        <button onClick={login}>Entrar</button>
      </>
      )}
    </>
    )}
    </UserConsumer>
  }
}

export default Login;