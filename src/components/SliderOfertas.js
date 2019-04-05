import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";

class Oferta extends React.Component {

  render() {
    return <div style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{objectFit:'cover', height: '100%'}} 
          alt={this.props.id}
          src={this.props.img}/>
        <Link 
          to={"/oferta/"+this.props.id}
          style={{
            alignSelf: 'center',
          }}
        >
          <RubikText bold={true}>ATIVAR CUPOM</RubikText>
        </Link>
    </div>
  }
}

export default class SliderOfertas extends React.Component {

  state = {
    ofertas: []
  }

  componentDidMount() {
    const ofertas = [
      {
        id: 1,
        img: "https://i.imgur.com/UYiroysl.jpg",
        lista_desejo: false
      },
      {
        id: 223,
        img: "https://i.imgur.com/UPrs1EWl.jpg",
        lista_desejo: false
      },
      {
        id: 2,
        img: "https://avatars1.githubusercontent.com/u/7903384?s=400&v=4",
        lista_desejo: true
      },
    ]

    this.setState({ofertas})
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };
    return (<View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '100px'
      }}>
      <Slider {...settings}>
        {this.state.ofertas.map((oferta) => (
          <Oferta
            id={oferta.id}
            img={oferta.img}
            liked={oferta.lista_desejo}
          />
        ))}
      </Slider>
      </View>
    );
  }
}
