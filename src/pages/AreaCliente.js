import React, { Component } from 'react';
import Header from '../components/Header'
import MiniRodape from '../components/MiniRodape';
import View from '../ui/View';
import RubikText from '../ui/RubikText';

class AreaCliente extends Component {

  render() {
    return <>
      <Header/>
      <View>
      <RubikText>Área do Cliente</RubikText>

      <View><RubikText>Olá Ciclana, seja bem-vinda</RubikText></View>
      </View>
      <MiniRodape/>
      </>
    
  }
}

export default AreaCliente;