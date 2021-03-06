import React from 'react';
import View from '../ui/View';
import Slider from "react-slick";
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import { FaMapMarker } from 'react-icons/fa';
import { LojaConsumer } from '../LojaContext';
import ReactGA from 'react-ga';

class InfosLoja extends React.Component {

  state = {
    dadosLoja: null
  }

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  componentDidMount() {
    if(this.props.atualizaDadosLoja) {
      this.props.atualizaDadosLoja()
      .then((dadosLoja) => {
        console.log(dadosLoja)
        this.setState({dadosLoja})
      })
    }    
    ReactGA.pageview('/loja');
  }

  render() {
    const dadosLoja = this.state.dadosLoja || this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }
    return ( <View>
      <Header/>

      <View className="container">
        <Breadcrumb>
          <RubikText bold={true} style={{color: 'black'}}>Loja</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', padding: 20}}>
            <LaughingSmiling className="titulo-loja">Vista-se bem e com a qualidade</LaughingSmiling>
            <LaughingSmiling className="titulo-loja">das melhores marcas!</LaughingSmiling>
          </View>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <RubikText bold={true} style={{color: 'black', fontSize:16}}>Somos uma loja multimarcas de moda
          jovem, casual, acessórios e calçados</RubikText>
        </View>
      </View>

      <View style={{padding: 20 , marginBottom: 60}}>
        <Slider {...this.settings}>
        { dadosLoja && dadosLoja.fotos && dadosLoja.fotos.map((foto, key) => {
          return <View style={{width: '100%'}}>
            <View style={{  alignSelf: 'center', overflow:'hidden',width: '100%', display: 'flex'}} key={key}>
            <img 
              src={foto.urlCloudinary}
              alt="Foto Loja"
              className="img-slider"
              style={{maxWidth: '100%',objectFit:'cover', alignSelf: 'center'}}
            />
          </View>
          </View>
        }) }
        </Slider>
      </View>

      <View style={{padding: 20, backgroundColor: '#ebebeb'}}>
        <View className="container container-sm">
            <RubikText bold={true} style={{fontSize:20}}>COMO CHEGAR</RubikText>
            <RubikText style={{fontSize: 18}}>
              <FaMapMarker
                size={14}
              />
              {dadosLoja.endereco}
            </RubikText>
            <iframe 
              style= {{
                border: 10,
                borderColor: 'white',
                borderStyle: 'solid',
                marginTop: 20,
                marginBottom: 20,
                minHeight: 400
              }}
              title="Mapa Vestylle"
              frameborder="0" 
              src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJOf4a3ANYx5QR03_K03BGa78&key=AIzaSyBWFBnGtrkMv_qF_dCaduOL8IWsJELc4h4" 
              allowfullscreen>
            </iframe> 
        </View>
      </View>

      <RodapeCompleto/>
    </View>
    )
  }
}
export default class Loja extends React.Component {  
  render() {
    return <LojaConsumer>
      {({ atualizaDadosLoja, dadosLoja }) => (<>
          <InfosLoja
            atualizaDadosLoja = {atualizaDadosLoja}
            dadosLoja = {dadosLoja}
          />
      </>
      )}
    </LojaConsumer>
  }
}