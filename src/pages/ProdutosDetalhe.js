import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import { Link } from 'react-router-dom'
import { LojaConsumer } from '../LojaContext';
import CupomBoasVindas from '../components/CupomBoasVindas';

class ProdutoDetalhado extends React.Component {

  state = {
    oferta: null
  }

  componentDidMount() {
    if(this.props.produtoId) {
      this.props.getOfertaById(this.props.produtoId)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  componentWillReceiveProps(props) {
    if(props.produtoId) {
      props.getOfertaById(props.produtoId)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  render() {
    const oferta = this.state.oferta
    const cupom = oferta && oferta.cupons && oferta.cupons.length > 0 ? oferta.cupons[0] : null
    console.log(oferta)
    if (!oferta) return <>Oferta não encontrada</>
    return (
      <>
      {cupom && cupom.id && (
      <View style={{
        alignItems: 'center',
        backgroundColor: '#e20f17',
        padding: 10,
        marginTop: 20,
        marginBottom:-15
      }}>
        <RubikText bold={true} style={{ fontSize: 20, color: 'white' }}>
          {cupom.porcentagem_off && 
            cupom.porcentagem_off+"% OFF COM CUPOM"
          }
          {!cupom.porcentagem_off && 
            "DESCONTO COM CUPOM"
          }
        </RubikText>
      </View>

      )}
      <View style={{
        alignItems: 'center',
        backgroundColor: '#55bcba',
        padding: 10,
        marginTop: 20,
        marginBottom:5
      }}>
        <RubikText bold={true} style={{ fontSize: 20 }}>
          {oferta.titulo.toUpperCase()}
        </RubikText>
      </View>
      
      <View style={{
        alignItems: 'center',
        marginBottom: 20
      }}>
        <RubikText>{oferta.subtitulo}</RubikText>

        <img 
          style={{
            objectFit:'cover', 
            height: '100%',
            margin:30
          }} 
          alt={oferta.titulo}
          className="img-slider"
          src={oferta.urlFoto}/>

        <View style={{
          backgroundColor: 'black',
          alignItems: 'left',
          alignSelf: 'stretch',
          padding: 20,
          marginTop: 5
        }}>
          <RubikText style={{
            color: 'white',
            fontSize: 20
           }}>
            {oferta.texto_oferta}
          </RubikText>
          <RubikText style={{
            color: 'white',
            marginTop: 10
           }}>
            {oferta.descricao_oferta}
          </RubikText>

        </View>
      
        {cupom && cupom.id && (
          <Link
            to={"/cupom/"+cupom.id}
            title="VER DETALHES"
            style={{
              backgroundColor: '#e20f17',
              color: 'white',
              padding: 8,
              marginTop:20,
              marginBottom:20,
              paddingRight: 30,
              paddingLeft: 30,
              alignSelf: 'center'
            }}
          >
            <RubikText bold={true}>VER CUPOM DE DESCONTO</RubikText>
          </Link>
        )}

      </View>

      </>
    )
  }
}

export default class ProdutosDetalhe extends React.Component {

  state = {
    produtoId: null
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const produtoId = params.produtoId
    this.setState({
      produtoId
    })
  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: '#585756'}}>Produtos</RubikText>
      </Breadcrumb>

      <View>
        <LojaConsumer>
          {({getOfertaById}) => (
            <ProdutoDetalhado
              getOfertaById={getOfertaById}
              produtoId={this.state.produtoId}
            />
          )}
        </LojaConsumer>
      </View>

      <CupomBoasVindas/>

      <RodapeCompleto/>
    </View>
    )
  }
}