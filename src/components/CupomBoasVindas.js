import React, { Component } from 'react';
import View from '../ui/View';
import { Link } from 'react-router-dom'
import RubikText from '../ui/RubikText';
import { UserConsumer } from '../UserContext';

class CupomContent extends Component {

  render() {
    if(this.props.isAuth) {
      return null
    }
    
    return <View style={this.style.container}>
      <View 
        className="cupom-boas-vindas"
        style={{
        flexDirection: 'row',
      }}>
        <View style={{
          textAlign: 'center',
          position: 'relative',
          width: 120
          }}>
          <View style={{
            backgroundColor: '#e20f17',
            position: 'absolute',
            top: -25,
            padding: 10,
            paddingTop: 20
          }}
          className="bandeirola">
            <RubikText bold={true} 
              style={{
                fontSize:32,
                color: 'white'
              }}>10%</RubikText>
            <RubikText bold={true} 
              style={{
                marginTop: -5,
                fontSize:28,
                color: 'white',
                flexDirection: 'column'
              }}>OFF</RubikText>
          </View>
        </View>
        <View>
          <View style={{padding: 15, paddingRight: 0, textAlign:'left'}}>
          <RubikText bold={true} className="faca-seu-cadastro">FAÇA SEU CADASTRO </RubikText>
          <RubikText bold={true} className="faca-seu-cadastro" style={{marginTop: 5, marginBottom: 5}}>E GANHE UM CUPOM </RubikText>
          <RubikText bold={true} className="faca-seu-cadastro">DE BOAS-VINDAS!</RubikText>
          </View>
          <Link
            to="/cadastro"
            style={{
              borderWidth: 1,
              padding: 12
            }}
          >
            <RubikText bold={true} className="faca-seu-cadastro">QUERO ME CADASTRAR</RubikText>
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

class CupomBoasVindas extends Component {
  render() {
    return <UserConsumer>
      {({ isAuth }) => (
        <CupomContent isAuth={isAuth}/>
      )}
      </UserConsumer>
  }
}

export default CupomBoasVindas