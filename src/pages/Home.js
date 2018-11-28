import React, { Component } from 'react';
import logo from '../logo.svg';

class Home extends Component {
  render() {
    return <section>
        <img src={logo} className="logo" alt="logo" />
        <p>
        Mude algo no arquivo <code>src/pages/Home.js</code> e veja a mudança aqui.
        </p>
    </section>
  }
}

export default Home;