import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import RubikText from "../ui/RubikText";
import View from "../ui/View";
import { LojaConsumer } from "../LojaContext";
import TouchableHighlight from "../ui/TouchableHighlight";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class Oferta extends React.Component {

  render() {
    return <div style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{
            objectFit:'cover', 
            height: '100%',
            borderWidth: 2,
            borderColor: '#bdbabc',
            borderRadius: 10
        }} 
          alt={this.props.id}
          src={"http:"+this.props.img}/>
        <View style={{
          flexDirection: 'row'
        }}>
          <Link 
            to={"/oferta/"+this.props.id}
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              alignItems:'flex-start',
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            <RubikText 
              bold={true}
              style={{
                color: '#585756',
                textDecorationLine: 'underline',
              }}
            >{this.props.titulo.toUpperCase()}</RubikText>
            <RubikText style={{
              color: '#585756',
              fontSize:14}}
            >
              {this.props.subtitulo}
            </RubikText>
          </Link>
          <TouchableHighlight
          onPress={() => this.props.likeCallback(this.props.id)}
          style={{
            flexGrow:0
          }}>
            {this.props.liked ? (
              <FaHeart
                size={32}
                style={{color: '#585756'}}
              />
            ) : (
              <FaRegHeart
                size={32}
                style={{color: '#585756'}}
              />
            )}
          </TouchableHighlight>
        </View>
    </div>
  }
}

class ListaOfertas extends React.Component {

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  state = {
    ofertas: []
  }

  componentDidMount() {
    this.setState({
      ofertas: this.props.ofertas
    })
    this.props.atualizaOfertas()
    .then((ofertas)=>{
      ofertas = ofertas.slice(0,10)
      this.setState({ofertas})
    })
  }

  render() {
    return(<Slider {...this.settings}>
        {this.state.ofertas.map((oferta, key) => (
          <Oferta
            key={key}
            id={oferta.id}
            img={oferta.urlFoto}
            liked={oferta.liked}
            likeCallback={this.likeCallback}
            titulo={oferta.descricao_oferta}
            subtitulo={oferta.descricao_oferta}
          />
        ))}
      </Slider>
    )
  }

  likeCallback = (id) => {
    let ofertas = this.state.ofertas
    ofertas.forEach( (oferta, index) => {
      if(oferta.id===id) {
        ofertas[index].liked = true
      }
    })
    this.setState({ ofertas })
  }
}
export default class SliderOfertas extends React.Component {

  state = {
    ofertas: []
  }


  render() {
    return (<View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '100px'
      }}>

      <LojaConsumer>
        {({atualizaOfertas, ofertas}) => (
        <ListaOfertas
          atualizaOfertas={atualizaOfertas}
          ofertas={ofertas}
        />
        )}
      </LojaConsumer>
      </View>
    );
  }
}
