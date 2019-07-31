import React from "react";
import Slider from "react-slick";
import View from "../ui/View";
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
    error: null,
    listaDesejosIds: []
  }

  static getDerivedStateFromProps(props, state) {

    if ((props.listaDesejos !== state.listaDesejosIds) || (!props.isLoadingUser && !state.ofertas && !props.ofertas)) {
      const listaDesejosIds = props.listaDesejos ? props.listaDesejos.map((produto)=> produto.id) : []
      props.getOfertasComLike(listaDesejosIds)
      .then(ofertas => {
      console.log("ofertas",ofertas)
        return {
          ofertas: ofertas,
          listaDesejosIds: props.listaDesejosIds
        }
      })
    }

    if(props.ofertas !== state.ofertas) {
      return {
        ofertas: props.ofertas
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    if(!this.props.ofertas) {
      return
    }
    this.setState({
      ofertas: this.props.ofertas.slice(0,10)
    })
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
          <div style={{position: 'relative'}} key={key}>
          <div style={{paddingTop: 5}}>
            <Produto
              key={key}
              id={oferta.id}
              img={oferta.urlFoto}
              liked={oferta.liked}
              titulo={oferta.titulo}
              subtitulo={oferta.subtitulo}
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
        {( {getOfertasComLike, ofertas, listaDesejos, isLoadingUser, atualizaListaDesejos, atualizaOfertas} ) => (
          <ListaOfertas
            atualizaOfertas={atualizaOfertas}
            atualizaListaDesejos={atualizaListaDesejos}
            getOfertasComLike={getOfertasComLike}
            ofertas={ofertas}
            listaDesejos={listaDesejos}
            isLoadingUser={isLoadingUser}
          />
        )}
      </UserConsumer>
      </View>
    );
  }
}
