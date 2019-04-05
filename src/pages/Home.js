import React, { Component } from 'react';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto';
import SimpleMenu from '../components/SimpleMenu';
import SliderOfertas from '../components/SliderOfertas';
import SliderCupons from '../components/SliderCupons';
import View from '../ui/View';
import RubikText from '../ui/RubikText';

class Home extends Component {
  render() {
    return <>
      <Header/>
      <SimpleMenu/>
      <View style={{
        paddingTop: 20
      }}>
        <View style={{position: 'relative'}}>
          <div style={{
            position: 'absolute',
            height: '55%',
            width: '100%',
            backgroundColor: '#55bcba',
            top: '20%',
          }}></div>
          <SliderCupons/>
        </View>
        <View style={{
          alignItems:'center',
        }}>
          <RubikText bold={true} style={{fontSize: 25}}>
          preparamos
          </RubikText>
          <RubikText bold={true} style={{fontSize: 26}}>
          benefícios exclusivos
          </RubikText>
          <RubikText bold={true} style={{fontSize: 25}}>
          para você
          </RubikText>
        </View>
        <View style={{
          alignItems:'center',
          margin: 20,
          padding: 5,
          paddingTop: 10,
          borderTop: 1,
          borderTopStyle: 'solid',
          borderColor: '#585756'
        }}>
        <RubikText 
          bold={true} 
          style={{ fontSize: 15, color: '#585756' }}>
          Com os cupons promocionais
        </RubikText>
        <RubikText 
          bold={true} 
          style={{ fontSize: 15, color: '#585756' }}>
        Vestylle Megastore Jaú, você tem
        </RubikText>
        <RubikText 
          bold={true} 
          style={{ fontSize: 15, color: '#585756' }}>
          desconto o ano inteiro.
        </RubikText>
        </View>
      </View>
      <View style={{
        paddingTop:40,
      }}>
      <RubikText 
        bold={true} 
        style={{ 
          alignSelf: 'center', 
          fontSize: 20,
          marginBottom: 5
        }}>
        CONFIRA AS NOVIDADES
      </RubikText>
      <SliderOfertas/>
      </View>
      <RodapeCompleto/>
    </>
    
  }
}

export default Home;