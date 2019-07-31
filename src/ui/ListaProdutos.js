import React from 'react';
import View from '../ui/View';
import Produto from '../ui/Produto';
import ProdutoThumb from '../ui/ProdutoThumb';

export default class ListaProdutos extends React.Component {

  state = {
    ofertas: [],
    listaDesejos: [],
    visualizacao: 'full',
    atualizaOfertas: null
  }

  constructor() {
    super();
    this.atualizaOfertas = this.atualizaOfertas.bind(this)
  }

  atualizaOfertas() {
    this.props.atualizaListaDesejos();
    this.props.atualizaOfertas();
    this.props.getOfertasComLike()
    .then((ofertas) => {
      console.log("ofertas Receidas", ofertas)
      this.setState({ofertas})
    })
  }

  componentDidMount() {
    this.setState({
      atualizaOfertas: this.atualizaOfertas
    })
    this.atualizaOfertas();
  }

  static getDerivedStateFromProps(props, state) {
    const idsListaState = state.listaDesejos.map(e => e.id)
    const idsListaProps = props.listaDesejos.map(e => e.id)
      console.log(idsListaProps, idsListaState)
    if (!idsListaProps.every( e => idsListaState.includes(e)) ||
      !idsListaState.every( e => idsListaProps.includes(e))) {
      if(state.atualizaOfertas) {
        state.atualizaOfertas()
      }
      return {
        listaDesejos: props.listaDesejos,
      };
    }
    if (props.visualizacao !== state.visualizacao) {
      return {
        visualizacao: props.visualizacao,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }


  render() {

    if(this.state.visualizacao === 'thumb') {
      return <View style={{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        marginBottom: 50
        }}>
      {this.state.ofertas.map((oferta, key) => {
        return (
        <View 
          style={{
            position:'relative', 
            maxWidth: '50%', 
            float: 'left',
            minWidth: 160
          }} 
          key={key}>
          <ProdutoThumb
            id={oferta.id}
            img={oferta.urlFoto}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
        )
      })}
      </View>
    }

    // Quando visualizacao !== de 'thumb'

    const ofertas = this.state.visualizacao === "wide" ?
        this.state.ofertas.slice(0,6) :
        this.state.ofertas;
  return <>
    {ofertas.map((oferta, key) => {
      let rowBackground = null

      // Exibe um div de background a cada 2 produtos
      // (somente na visualizacao full)
      if(key%2 === 0 && this.state.visualizacao === 'full') {
        rowBackground = <div style={{
          position: 'absolute',
          height: '50%',
          width: '100%',
          backgroundColor: '#55bcba',
          top: '25%',
          zIndex: 1
        }}></div>
      }


      return (
      <View style={
            (this.state.visualizacao === 'wide' || this.state.visualizacao === 'wide-full') ? 
            this.styleProdutoWide : this.styleProduto
          } key={key}>
        {rowBackground}
        <View 
          style={{padding:30, zIndex:2}} 
          className={
            (this.state.visualizacao === 'wide' || this.state.visualizacao === 'wide-full') ? 
            'produto-desktop' : ''
          }>
          <Produto
            key={key}
            id={oferta.id}
            img={oferta.urlFoto}
            liked={oferta.liked}
            titulo={oferta.titulo}
            subtitulo={oferta.subtitulo}
            porcentagem_off={oferta.porcentagem_off}
          />
        </View>
      </View>
    )})}
    </>
  }

  styleProduto = {
      position: 'relative',
      alignItems: 'center'
  }
  styleProdutoWide = {
      maxWidth: '33%',
      float: 'left',
      position: 'relative',
      display: 'inline-block'
  }

}

