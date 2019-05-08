import React from "react";
import Slider from "react-slick";
import View from "../ui/View";
import { LojaConsumer } from "../LojaContext";
import Produto from "../ui/Produto";
import { UserConsumer } from "../UserContext";
import { FaSpinner } from "react-icons/fa";
import RubikText from "../ui/RubikText";

class ListaOfertas extends React.Component {

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  state = {
    ofertas: null,
    error: null
  }

  atualizaOfertas(props) {
    const listaDesejosIds = props.listaDesejos ? props.listaDesejos.map((produto)=> produto.id) : []
    this.props.getOfertasComLike(listaDesejosIds)
    .then((ofertas)=>{
      ofertas = ofertas.slice(0,10)
      this.setState({ofertas})
    })
    .catch((e) => {
      const error = "Erro ao carregar ofertas."
      this.setState({error})
    })
  }

  componentDidMount() {
    if(!this.props.ofertas) {
      return
    }
    this.setState({
      ofertas: this.props.ofertas.slice(0,10)
    })
    this.atualizaOfertas(this.props)
  }
  
  componentWillReceiveProps(props) {
    this.atualizaOfertas(props)
  }

  render() {
    if(this.state.ofertas === null) {
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

    if(this.state.ofertas.length === 0) {
      return <RubikText
        style={{
          color: 'white',
          alignSelf: 'center',
          marginTop: 80,
          zIndex: 2
        }}
        >Nenhuma oferta encontrada.</RubikText>
    }
    return(<Slider {...this.settings}>
        {this.state.ofertas.map((oferta, key) => (
          <div style={{position: 'relative'}}>
          <div style={{paddingTop: 5}}>
            <Produto
              key={key}
              id={oferta.id}
              img={oferta.urlFoto}
              liked={oferta.liked}
              titulo={oferta.descricao_oferta}
              subtitulo={oferta.descricao_oferta}
            />
          </div>
          </div>
        ))}
      </Slider>
    )
  }
}
export default class SliderOfertas extends React.Component {
  render() {
    return (<View style={{
        width:'93%', 
        alignSelf:'center',
        marginBottom: '100px'
      }}>

      <UserConsumer>
        {( {listaDesejos} ) => (
        <LojaConsumer>
          {({getOfertasComLike, ofertas}) => (

          <ListaOfertas
            getOfertasComLike={getOfertasComLike}
            ofertas={ofertas}
            listaDesejos={listaDesejos}
          />
          )}
        </LojaConsumer>
        )}
      </UserConsumer>
      </View>
    );
  }
}
