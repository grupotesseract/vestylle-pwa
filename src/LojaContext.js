import React  from 'react';

const LojaContext = React.createContext();

class LojaProvider extends React.Component {
  state = { 
    ofertas: null,
    cupons: null,
    dadosLoja: null
  }

  constructor() {
    super()
    this.atualizaOfertas = this.atualizaOfertas.bind(this)
    this.atualizaCupons = this.atualizaCupons.bind(this)
    this.getOfertasComLike = this.getOfertasComLike.bind(this)
    this.getOfertaById = this.getOfertaById.bind(this)
    this.faleConosco = this.faleConosco.bind(this)
    this.atualizaDadosLoja = this.atualizaDadosLoja.bind(this)
  }

  async atualizaDadosLoja() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/lojas')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizaDadosLoja',erro))
    if(res && res.success) {
      const dadosLoja = res.data;
      this.setState({dadosLoja})
      return dadosLoja
    } 
    if(res && !res.success) {
      throw res.message
    }
    if(!res) {
      return {}
    }
  } 
  
  async atualizaOfertas() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/ofertas')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizaOfertas',erro))
    if(res && res.success) {
      const ofertas = res.data;
      this.setState({ofertas})
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
    if(this.state.ofertas === null) {
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

  async getOfertaById(idOferta) {
    if(!this.state.ofertas) {
      await this.atualizaOfertas()
    }
    const oferta = this.state.ofertas.find((oferta) => {
      return Number(oferta.id) === Number(idOferta)
    })
    return oferta
  }

  async atualizaCupons() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/cupons')
    .then(response => response.json())
    .catch(erro => console.error('Erro no atualizacupons',erro))
    if(res && res.success) {
      const cupons = res.data;
      this.setState({cupons})
      return cupons
    } else {
      throw res.message
    }
  }

  async faleConosco(pessoa_id, nome, contato, assunto, mensagem) {
    const params = JSON.stringify({
      pessoa_id,
      nome,
      assunto,
      mensagem,
      contato
    })
    const res = await fetch(process.env.REACT_APP_API_URL+'/fale_conoscos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        return jsonRes
      })
    })
    .catch(error => console.error('Erro no fale conosco', error));
    return res;
  }


  render() {
    return (
      <LojaContext.Provider
        value={{ 
          cupons: this.state.cupons,
          ofertas: this.state.ofertas,
          atualizaCupons: this.atualizaCupons,
          atualizaOfertas: this.atualizaOfertas,
          getOfertasComLike: this.getOfertasComLike,
          getOfertaById: this.getOfertaById,
          faleConosco: this.faleConosco, 
          atualizaDadosLoja: this.atualizaDadosLoja,
          dadosLoja: this.state.dadosLoja
        }}
      >
        {this.props.children}
      </LojaContext.Provider>
    )
  }

  
}

const LojaConsumer = LojaContext.Consumer

export { LojaProvider, LojaConsumer }