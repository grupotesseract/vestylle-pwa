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
import { FaRegHeart, FaTh, FaSquare } from 'react-icons/fa';
import CupomBoasVindas from '../components/CupomBoasVindas';
import TouchableHighlight from '../ui/TouchableHighlight';
import ProdutoThumb from '../ui/ProdutoThumb';

class ListaProdutos extends React.Component {

  state = {
    ofertas: [],
    listaDesejos: [],
    visualizacao: 'full',
    atualizaOfertas: null
  }

  constructor() {
    super();
    this.atualizaOfertas = this.atualizaOfertas.bind(this)
  }

  atualizaOfertas(listaNova) {
    if(!listaNova) {
      listaNova = this.state.listaDesejos
    }
    if(!this.props.getOfertasComLike) {
      return null
    }

    let listaDesejos = []
    if(listaNova) {
      listaDesejos = listaNova.map((oferta) => oferta.id);
    }
    this.props.getOfertasComLike(listaDesejos, this.props.userToken)
    .then((ofertas) => {
      this.setState({ofertas})
    })
  }

  componentDidMount() {
    this.setState({
      atualizaOfertas: this.atualizaOfertas
    })
    this.atualizaOfertas();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.listaDesejos !== state.listaDesejos) {
      if(state.atualizaOfertas) {
        state.atualizaOfertas(props.listaDesejos)
      }
      return {
        listaDesejos: props.listaDesejos,
      };
    }
    if (props.visualizacao !== state.visualizacao) {
      return {
        visualizacao: props.visualizacao,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }


  render() {

    if(this.state.visualizacao === 'thumb') {
      return <View style={{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        marginBottom: 50
        }}>
      {this.state.ofertas.map((oferta, key) => {
        return (
        <View 
          style={{
            position:'relative', 
            maxWidth: '50%', 
            float: 'left',
            minWidth: 160
          }} 
          key={key}>
          <ProdutoThumb
            id={oferta.id}
            img={oferta.urlFoto}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
        )
      })}
      </View>
    }

  return <>
    {this.state.ofertas.map((oferta, key) => {
      let rowBackground = null

      // Exibe um div de background a cada 2 produtos
      // (somente na visualizacao full)
      if(key%2 === 0 && this.state.visualizacao === 'full') {
        rowBackground = <div style={{
          position: 'absolute',
          height: '50%',
          width: '100%',
          backgroundColor: '#55bcba',
          top: '25%',
          zIndex: 1
        }}></div>
      }


      return (
      <View style={{position:'relative'}} key={key}>
        {rowBackground}
        <View style={{padding:30, zIndex:2}}>
          <Produto
            key={key}
            id={oferta.id}
            img={oferta.urlFoto}
            liked={oferta.liked}
            titulo={oferta.descricao_oferta}
            subtitulo={oferta.subtitulo}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
      </View>
    )})}
    </>
  }
}

export default class Produtos extends React.Component {

  state = {
    visualizacao: 'full'
  }

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
            marginBottom: 5,
            flexDirection: 'row'
          }}>
          <Link to="/listadesejos">
            <FaRegHeart 
              size={36}
              style={{padding: 2,margin: 2}}
            />
            <RubikText style={{textAlign: 'left'}}> Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
          </Link>
          <TouchableHighlight
            onPress={() => this.setVisualizacaoMiniatura()}
          >
            <FaTh
              size={36}
              style={{padding: 2,margin: 2}}
              color={this.state.visualizacao === 'thumb' ? '#585756' : '#bdbabc'}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setVisualizacaoGrande()}
          >
            <FaSquare
              size={36}
              style={{padding: 2,margin: 2}}
              color={this.state.visualizacao !== 'thumb' ? '#585756' : '#bdbabc'}
            />
          </TouchableHighlight>
        </View>
      </View>

      <View>
        <UserConsumer>
        {({listaDesejos, userToken}) => (
          <LojaConsumer>
          {({getOfertasComLike}) => (
            <ListaProdutos
              getOfertasComLike={getOfertasComLike}
              listaDesejos={listaDesejos}
              userToken={userToken}
              visualizacao={this.state.visualizacao}
            />
          )}
          </LojaConsumer>
        )}
        </UserConsumer>
      </View>
      <CupomBoasVindas/>
      <RodapeCompleto/>
    </View>
    )
  }

  setVisualizacaoGrande() {
    this.setState({ visualizacao: 'full' })
  }

  setVisualizacaoMiniatura() {
    this.setState({ visualizacao: 'thumb' })
  }
}