import React, { Component } from 'react';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto';
import SimpleMenu from '../components/SimpleMenu';
import SliderOfertas from '../components/SliderOfertas';
import SliderCupons from '../components/SliderCupons';

class Home extends Component {
  render() {
    return <>
      <Header/>
      <SimpleMenu/>
      <SliderCupons/>
      <SliderOfertas/>
      <RodapeCompleto/>
    </>
    
  }
}

export default Home;