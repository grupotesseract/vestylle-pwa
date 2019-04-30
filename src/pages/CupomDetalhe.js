
import React from 'react';
import View from '../ui/View';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';

export default class CupomDetalhe extends React.Component {

  render() {
    return ( <View>
      <Header/>

      <View style={{backgroundColor: "#585756"}}>
        <Breadcrumb>
            <RubikText style={{color: 'white'}}>Área dos cupom &gt;&nbsp;</RubikText>
            <RubikText bold={true} style={{color: 'white'}}>Meus cupons</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
            <View>
                Ativos | Utilizados
            </View>
        </View>
      </View>
    </View>
    )
  }
}