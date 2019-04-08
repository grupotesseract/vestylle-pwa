import React, { Component } from 'react';
import View from '../ui/View';
import { Link } from 'react-router-dom'
import RubikText from '../ui/RubikText';

class CupomBoasVindas extends Component {

  render() {
    return <View style={this.style.container}>
      <View style={{
        flexDirection: 'row'
      }}>
        <View style={{
          textAlign: 'center',
          position: 'relative',
          width: 120
          }}>
          <View style={{
            backgroundColor: 'red',
            position: 'absolute',
            top: -25,
            padding: 10,
            paddingTop: 40
          }}>
            <RubikText bold={true} 
              style={{
                fontSize:42,
                color: 'white'
              }}>10%</RubikText>
            <RubikText bold={true} 
              style={{
                fontSize:32,
                color: 'white',
                flexDirection: 'column'
              }}>OFF</RubikText>
          </View>
        </View>
        <View>
          <View style={{padding: 15, paddingRight: 0, textAlign:'left'}}>
          <RubikText bold={true} style={{fontSize: 19}}>FAÇA SEU CADASTRO </RubikText>
          <RubikText bold={true} style={{fontSize: 19, marginTop: 5, marginBottom: 5}}>E GANHE UM CUPOM </RubikText>
          <RubikText bold={true} style={{fontSize: 19}}>DE BOAS-VINDAS!</RubikText>
          </View>
          <Link
            to="/cadastro"
            style={{
              borderWidth: 1,
              padding: 12
            }}
          >
            <RubikText bold={true}>QUERO ME CADASTRAR</RubikText>
          </Link>
        </View>
      </View>
    </View>
  }

  goTo = (page) => {
    this.props.navigation.navigate(page)
  }

  style = {
    container: {
      justifyContent: 'center',
      flexDirection: "row",
      backgroundColor: "#feca03",
      padding: 15,
      paddingTop: 17,
      paddingBottom: 18,
    },
    bandeirola: {
      color: "#bdbbbc"
    }
  }
}

export default CupomBoasVindas