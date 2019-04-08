import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";
import { LojaConsumer } from "../LojaContext";

class Cupom extends React.Component {

  render() {
    return <div 
      key={this.props.key}
      style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{
            objectFit:'cover', 
            height: '100%',

          }} 
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

class ListaCupons extends React.Component {
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  state = {
    cupons: []
  }

  componentDidMount() {
    this.setState({cupons: this.props.cupons})
    this.props.atualizaCupons()
    .then((cupons)=>{
      cupons = cupons.slice(0,10)
      this.setState({cupons})
    })
  }

  render() {
    return <Slider {...this.settings}>
      {this.state.cupons.map((cupom, key) => (
        <Cupom
          key={key}
          id={cupom.id}
          img={cupom.foto_caminho || "http://via.placeholder.com/500x500"}
        />
      ))}
    </Slider>
  }
}

export default class SliderCupons extends React.Component {

  state = {
    cupons: []
  }

  render() {
    return (
      <View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '100px',
      }}>
      <LojaConsumer>
        {({atualizaCupons, cupons}) => (
        <ListaCupons
          atualizaCupons={atualizaCupons}
          cupons={cupons}
        />
        )}
      </LojaConsumer>
      </View>
    );
  }
}