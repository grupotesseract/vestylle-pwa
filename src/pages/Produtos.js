import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';

export default class Produtos extends React.Component {

  state = {
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>Produtos</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
          <LaughingSmiling>das melhores marcas!</LaughingSmiling>
        </View>
      </View>

      <RubikText bold={true} style={{color: 'black'}}>Confira as novidades</RubikText>
      <View>
        <Link to="/desejos">
          <RubikText>Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
        </Link>
      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}