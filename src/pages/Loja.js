import React from 'react';
import View from '../ui/View';
import Slider from "react-slick";
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import { FaMapMarker } from 'react-icons/fa';

export default class Loja extends React.Component {

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>Loja</RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
          <LaughingSmiling>das melhores marcas!</LaughingSmiling>
        </View>
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <RubikText bold={true} style={{color: 'black', fontSize:20}}>Somos uma multimarcas de moda</RubikText>
        <RubikText bold={true} style={{color: 'black', fontSize:20}}>jovem, casual, acessórios e calçados</RubikText>
      </View>

      <View style={{padding: 20 , marginBottom: 60}}>
        <Slider {...this.settings}>
          <View style={{  alignSelf: 'center', overflow:'hidden',width: '100%'}}>
            <img 
              src="http://www.sjequipaobra.com.br/fotos/vestylle (12).jpg"
              alt="Foto Loja"
          className="img-slider"
              style={{maxWidth: '100%', height: '100%',objectFit:'cover'}}
            />
          </View>
          <View style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
            <img 
              src="http://www.sjequipaobra.com.br/fotos/vestylle.jpg"
              alt="Foto Loja"
          className="img-slider"
              style={{maxWidth: '100%', height: '100%',objectFit:'cover'}}
            />
          </View>
        </Slider>
      </View>

      <View style={{padding: 20, backgroundColor: '#ebebeb'}}>
        <RubikText bold={true} style={{fontSize:20}}>COMO CHEGAR</RubikText>
        <RubikText style={{fontSize: 18}}>
          <FaMapMarker
            size={14}
          />
          Rua Edgard Ferraz 281, Jaú - SP | 17201-000
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

      <RodapeCompleto/>
    </View>
    )
  }
}