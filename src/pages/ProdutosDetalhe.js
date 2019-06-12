import React from 'react';
import Slider from "react-slick";
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import { Link } from 'react-router-dom'
import { LojaConsumer } from '../LojaContext';
import CupomBoasVindas from '../components/CupomBoasVindas';
import { UserConsumer } from '../UserContext';

class ProdutoDetalhado extends React.Component {

  state = {
    oferta: null
  }

  sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };


  componentDidMount() {
    if(this.props.produtoId) {
      this.props.getOfertaById(this.props.produtoId, this.props.userToken)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  componentWillReceiveProps(props) {
    if(props.produtoId) {
      props.getOfertaById(props.produtoId, props.userToken)
      .then((oferta) => {
        this.setState({oferta})
      })
    }
  }

  render() {
    const oferta = this.state.oferta
    if (!oferta) return <></>
    const cupom = oferta && oferta.cupons && oferta.cupons.length > 0 ? oferta.cupons[0] : null
    const porcentagem_off = cupom && cupom.id ? cupom.porcentagem_off : oferta.porcentagem_off
    console.log(oferta)
    return (
      <>
      {Number(porcentagem_off) > 0 && (
      <View style={{
        alignItems: 'center',
        backgroundColor: '#e20f17',
        padding: 10,
        marginTop: 20,
        marginBottom:-15
      }}>
        <RubikText bold={true} style={{ fontSize: 20, color: 'white' }}>
          {cupom && cupom.id && 
            porcentagem_off+"% OFF COM CUPOM"
          }
          {cupom && cupom.id && !cupom.porcentagem_off && 
            "DESCONTO COM CUPOM"
          }
          {(!cupom || !cupom.id) && 
            porcentagem_off+"% OFF"
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
        marginBottom: 20,
      }}>
        <RubikText style={{alignSelf: 'center', margin: 10}}>{oferta.subtitulo}</RubikText>

        { oferta.fotos && oferta.fotos.length > 0 &&
          <View style={{marginBottom: 50}}>
            <Slider {...this.sliderSettings}>
              {oferta.fotos.map((foto, key) => (
                <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex' }}>
                    <img 
                      style={{
                        objectFit:'cover', 
                      }} 
                      alt={oferta.titulo}
                      className="img-slider"
                      key={key}
                      src={foto.urlCloudinary}/>
                </div>
                </div>
              ))}
            </Slider> 
          </View>
        }

        { (!oferta.fotos || oferta.fotos.length === 0) &&
          <img 
            style={{
              objectFit:'cover', 
              height: '100%',
              margin:30
            }} 
            alt={oferta.titulo}
            className="img-slider"
            src={oferta.urlFoto}/>
        }

        <View style={{
          backgroundColor: 'black',
          alignItems: 'left',
          alignSelf: 'stretch',
          padding: 20,
          marginTop: 15
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
        {oferta.codigo_promocional &&
          <View style={{
            backgroundColor: "#ebebeb",
            padding:10,
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
            <RubikText bold={true}>CÓDIGO DO PRODUTO:</RubikText>
            <RubikText style={{marginLeft: 5}}> {oferta.codigo_promocional}</RubikText>
          </View>
        }
      
        {cupom && cupom.id && (
          <Link
            to={"/cupom/"+cupom.id}
            title="ATIVAR CUPOM"
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
        <UserConsumer>
          {({userToken}) => (
          <LojaConsumer>
            {({getOfertaById}) => (
              <ProdutoDetalhado
                getOfertaById={getOfertaById}
                produtoId={this.state.produtoId}
                userToken={userToken}
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
}