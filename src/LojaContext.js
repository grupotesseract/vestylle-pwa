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
  }

  componentWillMount() {
  }

  async atualizaOfertas() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/ofertas')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizaOfertas',erro))
    if(res.success) {
      const ofertas = res.data.ofertas;
      this.setState({ofertas})
      console.log("ofertas carregadas:", ofertas)
      return ofertas
    } else {
      throw res.message
    }
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
        }}
      >
        {this.props.children}
      </LojaContext.Provider>
    )
  }

  
}

const LojaConsumer = LojaContext.Consumer

export { LojaProvider, LojaConsumer }