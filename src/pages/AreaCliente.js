import React, { Component } from 'react';
import Header from '../components/Header'
import MiniRodape from '../components/MiniRodape';
import View from '../ui/View';

class AreaCliente extends Component {
  
  render() {
    return <>
      <Header/>
      <View>
      Area do cliente
      </View>
      <MiniRodape/>
      </>
    
  }
}

export default AreaCliente;