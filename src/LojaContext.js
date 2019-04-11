import React  from 'react';

const LojaContext = React.createContext();

class LojaProvider extends React.Component {
  state = { 
    ofertas: [],
    cupons: [],
  }

  constructor() {
    super()
    this.atualizaOfertas = this.atualizaOfertas.bind(this)
    this.atualizaCupons = this.atualizaCupons.bind(this)
    this.getOfertasComLike = this.getOfertasComLike.bind(this)
  }

  componentWillMount() {
  }

  async atualizaOfertas() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/ofertas')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizaOfertas',erro))
    if(res.success) {
      const ofertas = res.data;
      this.setState({ofertas})
      console.log("ofertas carregadas:", ofertas)
      return ofertas
    } else {
      throw res.message
    }
  }

  /***
   * Função que recebe um array com ids das ofertas
   * e retorna todas as ofertas marcando as 
   * recebidas com like = true 
   */
  async getOfertasComLike(idsOfertas) {
    if(!this.state.ofertas || this.state.ofertas.length < 1) {
      await this.atualizaOfertas()
    }
    const ofertasComLike = this.state.ofertas.map((oferta) => {
      if(idsOfertas.indexOf(oferta.id) !== -1) {
        oferta.liked = true
      } else {
        oferta.liked = false
      }
      return oferta
    })

    return ofertasComLike
  }

  async atualizaCupons() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/cupons')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizacupons',erro))
    if(res.success) {
      const cupons = res.data;
      this.setState({cupons})
      console.log("cupons carregadas:", cupons)
      return cupons
    } else {
      throw res.message
    }
  }

  render() {
    return (
      <LojaContext.Provider
        value={{ 
          cupons: ['this.state.cupons'],
          ofertas: this.state.ofertas,
          atualizaCupons: this.atualizaCupons,
          atualizaOfertas: this.atualizaOfertas,
          getOfertasComLike: this.getOfertasComLike,
        }}
      >
        {this.props.children}
      </LojaContext.Provider>
    )
  }

  
}

const LojaConsumer = LojaContext.Consumer

export { LojaProvider, LojaConsumer }