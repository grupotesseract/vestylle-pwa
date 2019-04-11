import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import MiniRodape from '../components/MiniRodape';

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
        <RubikText bold={true} style={{color: '#585756'}}>Novo</RubikText>
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
      <MiniRodape/>
    </View>
    )
  }
}