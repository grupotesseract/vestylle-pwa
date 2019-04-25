import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import Produto from '../ui/Produto';
import { LojaConsumer } from '../LojaContext';
import { UserConsumer } from '../UserContext';

class ListaProdutos extends React.Component {

  state = {
    ofertas: []
  }

  atualizaOfertas(props) {
    const listaDesejosId = props.listaDesejos.map((oferta) => oferta.id);
    props.getOfertasComLike(listaDesejosId)
    .then((ofertas) => {
      this.setState({ofertas})
    })
  }

  componentDidMount() {
    this.atualizaOfertas(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.atualizaOfertas(nextProps)
  }

  render() {
  return <>
    {this.state.ofertas.map((oferta, key) => (
      <Produto
        key={key}
        id={oferta.id}
        img={oferta.urlFoto}
        liked={oferta.liked}
        likeCallback={this.likeCallback}
        titulo={oferta.descricao_oferta}
        subtitulo={oferta.descricao_oferta}
      />
    ))}
    </>
  }
}

export default class Produtos extends React.Component {

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
        <Link to="/listadesejos">
          <RubikText>Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
        </Link>
      </View>
      <UserConsumer>
      {({listaDesejos}) => (
        <LojaConsumer>
        {({getOfertasComLike}) => (
          <ListaProdutos
            getOfertasComLike={getOfertasComLike}
            listaDesejos={listaDesejos}
          />
        )}
        </LojaConsumer>
      )}
      </UserConsumer>
      <RodapeCompleto/>
    </View>
    )
  }
}