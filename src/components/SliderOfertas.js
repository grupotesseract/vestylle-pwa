import React from "react";
import Slider from "react-slick";
import View from "../ui/View";
import { LojaConsumer } from "../LojaContext";
import Produto from "../ui/Produto";

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
          <Produto
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
