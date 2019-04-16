import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';

export default class Loja extends React.Component {

  state = {
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>Loja</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
          <LaughingSmiling>das melhores marcas!</LaughingSmiling>
        </View>
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <RubikText bold={true} style={{color: 'black'}}>Somos uma multimarcas de moda</RubikText>
        <RubikText bold={true} style={{color: 'black'}}>jovem, casual, acessórios e calçados</RubikText>
      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}