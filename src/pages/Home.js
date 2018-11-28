import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return <section>
        <img src={logo} className="logo" alt="logo" />
        <p>
        Mude algo no arquivo <code>src/pages/Home.js</code> e veja a mudança aqui.
        </p>
        <Link to="/login" class="btn"> Login </Link>
    </section>
  }
}

export default Home;