import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';

export default class ProdutosDetalhe extends React.Component {

  state = {
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const produtoId = params.produtoId
  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>Produtos</RubikText>
      </Breadcrumb>

      <RubikText bold={true} style={{color: 'black'}}>Confira as novidades</RubikText>
      <View>
        <Link to="/listadesejos">
          <RubikText>Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
        </Link>
      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}