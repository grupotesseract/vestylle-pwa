import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";
import { FaSpinner } from "react-icons/fa";
import { UserConsumer } from "../UserContext";

class Cupom extends React.Component {

  render() {
    return <div 
      key={this.props.key}
      style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{
            objectFit:'cover', 
            height: '100%'
          }} 
          className="img-slider"
          alt={this.props.id}
          src={this.props.img}/>
        <Link 
          to={"/cupom/"+this.props.id}
          style={{
            backgroundColor: "#feca03",
            padding: 9,
            position: "absolute",
            display: 'block',
            alignSelf: 'center',
            bottom: '30px'
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
    cupons: null
  }

  static getDerivedStateFromProps(props, state) {

    if (!props.isLoadingUser && !state.cupons && !props.cupons) {
      props.atualizaCupons()
    }

    if(props.cupons !== state.cupons) {
      return {
        cupons: props.cupons
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.setState({cupons: this.props.cupons})
    if(this.props.atualizaCupons) {
      this.props.atualizaCupons()
    }
  }

  

  render() {
    if(!this.state.cupons) {
      return <FaSpinner
        style={{
          fontSize: 72,
          color: 'white',
          alignSelf: 'center',
          marginTop: 60
        }}
        className='spin'
      />
    }
    if(this.state.cupons.length === 0) {
      return <RubikText
        style={{
          color: 'white',
          alignSelf: 'center',
          marginTop: 60,
          zIndex: 2
        }}
        >Nenhum cupom encontrado.</RubikText>
    }
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

  render() {
    return (
      <View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '70px',
      }}>
      <UserConsumer>
        {({atualizaCupons, cupons, isLoadingUser}) => (
          <ListaCupons
            atualizaCupons={atualizaCupons}
            cupons={cupons && cupons.filter((item) => item.em_destaque === true)}
            isLoadingUser={isLoadingUser}
          />
        )}
      </UserConsumer>
      </View>
    );
  }
}