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
    listaDesejosId: [],
    visualizacao: 'full'
  }

  atualizaOfertas() {
    if(!this.props.getOfertasComLike) {
      return null
    }

    let listaDesejosId = []
    if(this.state.listaDesejos) {
      listaDesejosId = this.state.listaDesejos.map((oferta) => oferta.id);
    }
    this.props.getOfertasComLike(listaDesejosId)
    .then((ofertas) => {
      this.setState({ofertas})
    })
    console.log('ataulizaofertas')
  }

  componentDidMount() {
    this.atualizaOfertas();
  }

  componentDidUpdate(prevProps, prevState) {
  if(prevProps.listaDesejosId!==this.props.someValue){
    //Perform some operation here
    this.atualizaOfertas();
  }
}

  static getDerivedStateFromProps(props, state) {
    if (props.listaDesejosId !== state.listaDesejosId) {
      return {
        listaDesejosId: props.listaDesejosId,
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
        {({listaDesejos}) => (
          <LojaConsumer>
          {({getOfertasComLike}) => (
            <ListaProdutos
              getOfertasComLike={getOfertasComLike}
              listaDesejos={listaDesejos}
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