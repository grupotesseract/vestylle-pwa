import React, { Component } from 'react';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto';

class Home extends Component {
  render() {
    return <>
      <Header/>
      <h4>slider cupons</h4>
      <h4>slider ofertas</h4>
      <RodapeCompleto/>
    </>
    
  }
}

export default Home;