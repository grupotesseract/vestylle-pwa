import React, { Component } from 'react';

class Login extends Component {
  render() {
    return <section>
      <form>
        <input type="email" name="password"></input>
        <input type="password" name="password"></input>
        <button type="submit">Entrar</button>
      </form>
    </section>
  }
}

export default Login;