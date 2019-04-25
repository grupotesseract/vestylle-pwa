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
import { FaRegHeart } from 'react-icons/fa';

class ListaProdutos extends React.Component {

  state = {
    ofertas: []
  }

  atualizaOfertas(props) {
    let listaDesejosId = []
    if(props.listaDesejos) {
      listaDesejosId = props.listaDesejos.map((oferta) => oferta.id);
    }
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
    {this.state.ofertas.map((oferta, key) => {
      console.log(key)
      let bg = null
      if(key%2 === 0) {
        bg = <div style={{
            position: 'absolute',
            height: '55%',
            width: '100%',
            backgroundColor: '#55bcba',
            top: '15%',
            zIndex: 1
          }}></div>
      }
      return (
      <View style={{position:'relative'}}>
        {bg}
        <View style={{padding:30, zIndex:2}}>
          <Produto
            key={key}
            id={oferta.id}
            img={oferta.urlFoto}
            liked={oferta.liked}
            likeCallback={this.likeCallback}
            titulo={oferta.descricao_oferta}
            subtitulo={oferta.subtitulo}
          />
        </View>
      </View>
    )})}
    </>
  }
}

export default class Produtos extends React.Component {

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: '#585756'}}>Produtos</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
          <LaughingSmiling>das melhores marcas!</LaughingSmiling>
        </View>
      </View>

      <View style={{ padding: 10, paddingLeft: 30, paddingRight: 30}}>
        <RubikText bold={true} style={{color: 'black'}}>Confira as novidades</RubikText>

        <View 
          style={{ 
            borderTop: 2, 
            borderBottom: 2, 
            borderColor: 'black', 
            borderStyle: 'solid', 
            paddingTop: 6, 
            paddingBottom:6,
            marginTop: 5,
            marginBottom: 5
          }}>
          <Link to="/listadesejos">
            <FaRegHeart 
              size={36}
              style={{padding: 2,margin: 2}}
            />
            <RubikText style={{textAlign: 'left'}}> Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
          </Link>
        </View>
      </View>

      <View>
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
      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}