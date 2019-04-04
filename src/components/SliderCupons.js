import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";

class Cupom extends React.Component {

  render() {
    return <div style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{objectFit:'cover'}} 
          alt={this.props.id}
          src={this.props.img}/>
        <Link 
          to={"/cupom/"+this.props.id}
          style={{
            backgroundColor: "#feca03",
            padding: 10,
            position: "absolute",
            display: 'block',
            alignSelf: 'center',
            bottom: '40px'
          }}
        >
          <RubikText bold={true}>ATIVAR CUPOM</RubikText>
        </Link>
    </div>
  }
}

export default class SliderCupons extends React.Component {

  state = {
    ofertas: []
  }

  componentDidMount() {
    const ofertas = [
      {
        id: 1,
        img: "https://i.imgur.com/UYiroysl.jpg"
      },
      {
        id: 2,
        img: "https://avatars1.githubusercontent.com/u/7903384?s=400&v=4"
      }
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
    return (
      <View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '100px'
      }}>
      <Slider {...settings}>
        {this.state.ofertas.map((oferta) => (
          <Cupom
            id={oferta.id}
            img={oferta.img}
          />
        ))}
      </Slider>
      </View>
    );
  }
}