import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";
import { LojaConsumer } from "../LojaContext";
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
    cupons: null
  }

  static getDerivedStateFromProps(props, state) {

    if (!props.isLoadingUser && !state.cupons && !props.cupons) {
      const token = props.userToken
      props.atualizaCupons(token)
    }

    if(props.cupons !== state.cupons) {
      console.log(props, state)
      return {
        cupons: props.cupons
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.setState({cupons: this.props.cupons})

  }

  

  render() {
    if(this.state.cupons === null) {
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
          marginTop: 80,
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
        marginBottom: '100px',
      }}>
      <UserConsumer>
        {({userToken, isLoadingUser}) => (
        <LojaConsumer>
          {({atualizaCupons, cupons}) => (
          <ListaCupons
            atualizaCupons={atualizaCupons}
            cupons={cupons}
            userToken={userToken}
            isLoadingUser={isLoadingUser}
          />
          )}
        </LojaConsumer>
        )}
      </UserConsumer>
      </View>
    );
  }
}