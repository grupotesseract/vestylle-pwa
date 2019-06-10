import React, { Component } from 'react';
import RubikText from '../ui/RubikText';
import View from '../ui/View';
import { LojaConsumer } from '../LojaContext';

class DadosMiniRodape extends Component {

  render () {
    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }
    return <>
      <RubikText bold = {true}>Vestylle Megastore Jaú</RubikText>
      <RubikText style={{paddingTop:5, paddingBottom:5, fontSize: 12}}>{dadosLoja.endereco}</RubikText>
      <RubikText style={{fontSize: 12}}>{dadosLoja.telefone}</RubikText>
    </>
  }
}
class MiniRodape extends Component {

  render() {
    return <View style={this.style.container}>
      <LojaConsumer>
      {({ dadosLoja }) => (
      <DadosMiniRodape
          dadosLoja = {dadosLoja}
      />
      )}
      </LojaConsumer>
    </View>
  }

  style = {
    container: {
      backgroundColor: "white",
      paddingTop: 15,
      paddingBottom: 18,
      alignItems: 'center',
      marginTop: 'auto',
    }
  }
}

export default MiniRodape;