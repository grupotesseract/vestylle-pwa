import React, { Component } from 'react';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto';
import SimpleMenu from '../components/SimpleMenu';

class Home extends Component {
  render() {
    return <>
      <Header/>
      <SimpleMenu/>
      <h4>slider cupons</h4>
      <h4>slider ofertas</h4>
      <RodapeCompleto/>
    </>
    
  }
}

export default Home;