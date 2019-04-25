import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import RodapeCompleto from '../components/RodapeCompleto';

export default class AdicionarCupom extends React.Component {

  state = {
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <Link to="/areacliente"><RubikText style={{color: '#585756'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
        <Link to="/adicionarcupom">
          <RubikText style={{color: '#585756'}}>Meus Cupons &gt;&nbsp;</RubikText>
        </Link>
        <RubikText bold={true} style={{color: '#585756'}}>Novo</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', paddingTop: 40, paddingBottom: 100}}>
          <LaughingSmiling>Funcionalidade de cupons</LaughingSmiling>
          <LaughingSmiling>disponível em breve</LaughingSmiling>
        </View>
      </View>

      <RodapeCompleto/>
    </View>
    )
  }
}