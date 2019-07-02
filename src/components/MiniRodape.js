import React, { Component } from 'react';
import RubikText from '../ui/RubikText';
import View from '../ui/View';
import { LojaConsumer } from '../LojaContext';

class DadosMiniRodape extends Component {

  state = {
    wide: false
  }
  
  componentDidMount() {
    this.setState({
      wide: window.innerWidth > 1023
    })
  }
  render () {
    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }
    return <View style={{ 
        justifyContent: 'space-evenly',
        alignItems: 'center' ,
        flexDirection: this.state.wide ? 'row' : 'column'
      }}>
      <RubikText bold = {true}>Vestylle Megastore Jaú</RubikText>
      <RubikText style={{paddingTop:5, paddingBottom:5, fontSize: 12}}>{dadosLoja.endereco}</RubikText>
      <RubikText style={{fontSize: 12}}>{dadosLoja.telefone}</RubikText>
    </View>
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
      marginTop: 'auto',
      borderTop: '1px solid black'
    }
  }
}

export default MiniRodape;