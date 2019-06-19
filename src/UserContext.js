import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    userToken: null,
    notificacoes: false,
    fbData: null,
    userId: null,
    perfil: null,
    ofertas: [],
    cupons: [],
    cuponsUtilizados: [],
    isLoadingUser: true
  }

  constructor() {
    super()
    this.ativaCupom = this.ativaCupom.bind(this)
    this.atualizaCupons = this.atualizaCupons.bind(this)
    this.atualizaCuponsUtilizados = this.atualizaCuponsUtilizados.bind(this)
    this.atualizaInfosUser = this.atualizaInfosUser.bind(this)
    this.buscaCupom = this.buscaCupom.bind(this)
    this.faleConosco = this.faleConosco.bind(this)
    this.getCupomById = this.getCupomById.bind(this)
    this.getDadosMeuPerfil = this.getDadosMeuPerfil.bind(this)
    this.getOfertas = this.getOfertas.bind(this)
    this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.receberNotificacoes = this.receberNotificacoes.bind(this)
    this.setDadosMeuPerfil = this.setDadosMeuPerfil.bind(this)
    this.setFacebookToken = this.setFacebookToken.bind(this)
    this.setPerfil = this.setPerfil.bind(this)
    this.setToken = this.setToken.bind(this)
    this.signup = this.signup.bind(this)
    this.toggleDesejo = this.toggleDesejo.bind(this)
  }

  loadFromLocalStorage() {
    if(!this.state.isAuth) {
      const userToken = localStorage.getItem('userToken')
      const userId = localStorage.getItem('userId')
      if(userToken && userId) {
        this.setState({userToken, userId, isAuth: true})
        if(!this.state.perfil) {
          const perfil = JSON.parse(localStorage.getItem('perfil'))
          // console.log("perfil carregado do localStorage", perfil)
          const ofertas = JSON.parse(localStorage.getItem('ofertas'))
          this.setState({perfil, ofertas})
        }
        return true
      }
    }
    return this.state.isAuth
  }

  componentDidMount() {
    this.atualizaInfosUser()
  }

  async atualizaInfosUser() {
    await this.loadFromLocalStorage()
    await this.atualizaCuponsUtilizados()
    await this.setState({ isLoadingUser: false })
  }

  async atualizaCupons() {
    if(this.state.isLoadingUser) {
      await this.atualizaInfosUser()
    }
    const userToken = this.state.userToken
    let auth = null
    if(userToken) {
      auth = {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+userToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    }
    await fetch(process.env.REACT_APP_API_URL+'/cupons', auth)
    .then(response => {
      response.json()
      .then(res => {
        if(res && res.success) {
          const cupons = res.data
          console.log("cupons",cupons)
          this.setState({
            cupons
          })
        }
      })
    })
    .catch(erro => console.error('Erro no atualizacupons',erro))
  }

  async atualizaCuponsUtilizados() {
    if(!this.state.userId) {
      return []
    }

    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId+'/cupons', {
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          const cuponsUtilizados = jsonRes.data
          const cuponsFormatados = cuponsUtilizados.map(cupom => {
            let cupomFormatado = Object.assign({},cupom,{codigo_unico: cupom.codigo_unico});
            return cupomFormatado
          })
          this.setState({cuponsUtilizados: cuponsFormatados})
          return cuponsFormatados
        } else {
          throw jsonRes.message
        }
      })
    })
    .catch(error => console.error('Atualiza cupons utilizados error', error));
    return res;
  }

  async getCupomById(cupomId) {
    if(!cupomId) {
      const msgErro = { erro: "Cupom não encontrado." }
      throw msgErro
    }

    const res = await fetch(process.env.REACT_APP_API_URL+'/cupons/'+cupomId,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.error('Erro no buscaCupom',erro))
    if(!res) {
      const msgErro = { erro: "Cupom não encontrado." }
      throw msgErro
    }
    if(res.success) {
      const cupom = res.data
      return cupom
    } else {
      throw res.message
    }
  }

  async buscaCupom(codigoCupom) {
    if(!codigoCupom) {
      const msgErro = { erro: "Sem código cupom" }
      throw msgErro
    }

    const res = await fetch(process.env.REACT_APP_API_URL+'/cupons/encrypt/'+codigoCupom,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.error('Erro no buscaCupom',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const cupom = res.data
      return cupom
    } else {
      throw res.message
    }

  }

  async ativaCupom(idCupom) {
    if(!this.state.userId || !idCupom) {
      return {}
    }
    const params = JSON.stringify({
      pessoa_id: this.state.userId
    })
    const res = await fetch(process.env.REACT_APP_API_URL+'/cupons/'+idCupom+'/ativar', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          const cupomAtivo = jsonRes.data
          return cupomAtivo
        } else {
          throw jsonRes.message
        }
      })
    })
    .catch(error => console.error('Ativa cupom error', error));
    return res;
  }

  async signup(login, passwd) {
    const params = JSON.stringify({email: login, password: passwd})
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      return response.json().then((jsonRes) => {
        if(jsonRes.success) {
          this.setToken(jsonRes.data.token.token)
          this.setPerfil(jsonRes.data.pessoa)
        }
        return jsonRes
      })
    })
    .catch(error => console.error('Signup error', error));
    return res;
  }

  async login(user,passwd) {
    const res = await fetch(process.env.REACT_APP_API_URL+'/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user, password: passwd})
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no login',erro))
    if(res && res.success) {
      const meuPerfil = res.data.pessoa
      const userToken = res.data.token.token
      this.setToken(userToken)
      this.setPerfil(meuPerfil)
    }
    return res;
  }


  logout() {
    localStorage.clear();
    this.setState({
      isAuth: false,
      userToken: null,
      fbData: null,
      userId: null,
      perfil: null,
      ofertas: []
    });
  }

  setToken(userToken) {
    this.setState({
      isAuth: true,
      userToken
    })
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('isAuth', true);
  }

  async setFacebookToken(fbResponse) {
    if(!fbResponse.accessToken || fbResponse.accessToken === '') {
      return null
    }
    const fbData = fbResponse
    this.setState({
      fbData
    })
    localStorage.setItem('fbData', JSON.stringify(fbData));
    const res = await this.getAPITokenFromFacebookData(fbData)
    .then((response) => {
      if(response && response.success) {
        const loginData = response.data
        const perfil = loginData.pessoa
        const userToken = loginData.token
        this.setToken(userToken)
        this.setPerfil(perfil)
        return userToken
      }
      return null
    })
    .catch((e) => {
      console.log("Error on facebook login", e)
      return null
    });
    return res
  }

  setPerfil(perfil) {
    let perfilCompleto = this.null2emptystring(perfil)

    // Inclui o primeiro nome no obj de perfil
    if(perfilCompleto.nome && perfilCompleto.nome !== '') {
      const nomeSimples = perfilCompleto.nome.split(' ')[0];
      perfilCompleto.nomeSimples = nomeSimples
    }

    this.setState({
      userId: perfil.id,
      perfil: perfilCompleto
    })
    localStorage.setItem('userId', perfil.id);
    localStorage.setItem('perfil', JSON.stringify(perfil));
  }

  async setOfertas(ofertas) {
    console.log("lista de desejo atualizada", ofertas)
    await this.setState({
      ofertas
    })
    localStorage.setItem('ofertas', JSON.stringify(ofertas));
  }

  async getAPITokenFromFacebookData(fbData) {
    console.log(fbData)
    const bodyRequest = {
      email: fbData.email,
      social_token: fbData.accessToken,
      nome: fbData.name
    }
    const res = await fetch(process.env.REACT_APP_API_URL+'/login/facebook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no login',erro))
    return res;
  }

  async toggleDesejo(oferta_id) {
    if(!this.state.userId) {
      return
    }
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId+'/ofertas', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"oferta_id":oferta_id})
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no toggleDesejo',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const ofertas = res.data.ofertas
      this.setOfertas(ofertas)
      return ofertas
    } else {
      throw res.message
    }
  }

  async getOfertas() {
    if(!this.state.userId) {
      return
    }
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId+'/ofertas',
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.error('Erro no getOfertas',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const ofertas = res.data.ofertas
      console.log("lista de desejos atualizadas", ofertas)
      await this.setOfertas(ofertas)
      return ofertas
    } else {
      throw res.message
    }
  }

  async getDadosMeuPerfil() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId,
      {
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+this.state.userToken
        }
      }
    )
    .then(response => response.json())
    .catch(erro => console.error('Erro no getDadosMeuPerfil',erro))
    if(!res) {
      return
    }
    if(res.success) {
      const meuPerfil = res.data
      this.setPerfil(meuPerfil)
      return meuPerfil
    } else {
      throw res.message
    }
  }

  async setDadosMeuPerfil(perfil) {
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.state.userToken
      },
      body: JSON.stringify(perfil)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no setDados',erro))
    if(res.errors) {
      throw res.errors
    }
    return res;
  }

  async faleConosco(nome, contato, assunto, mensagem) {
    const params = JSON.stringify({
      nome,
      assunto,
      mensagem,
      contato
    })
    const options = this.state.userToken ?
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+this.state.userToken,
          'Content-Type': 'application/json'
        },
        body: params
      } :
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: params
      }
    const res = await fetch(process.env.REACT_APP_API_URL+'/fale_conoscos', options)
    .then(response => {
      return response.json().then((jsonRes) => {
        return jsonRes
      })
    })
    .catch(error => console.error('Erro no fale conosco', error));
    return res;
  }

  null2emptystring = (obj) => {
    const objRes = obj
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if(!obj[prop]) {
            objRes[prop] = ''
          }
        }
    }
    return objRes
  }

  receberNotificacoes() {
    this.setState({
      notificacoes: true
    })
    // Pega registro do service worker
    if(!('serviceWorker' in navigator)) {
      console.log('sw not supported');
    } 
    if(('serviceWorker' in navigator)) {
      console.log('sw available (not ready)');
      navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) => {
        console.log('sw ready, registration:', serviceWorkerRegistration);

        console.log("REACT_APP_VAPID_PUBLIC_KEY", process.env.REACT_APP_VAPID_PUBLIC_KEY)
        // Pede permissão para exibir notificações
        // (ou avisa que bloqueou)
        if( Notification.permission === 'denied' ) {
          alert('Você proibiu as notificações, redefina as configurações para receber mensagens')
        }
        Notification.requestPermission((status) => {
          console.log('Notification status', status)
          if(status === 'granted') {
            let swReg = serviceWorkerRegistration;

            const vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
            const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);
      
            swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            }).then((subscription) => {
              this.enviaSubscription(subscription)
            }).catch((e) => console.error(e));
          }
        });
      })
      .catch(err => console.log('Erro no register do sw:', err))
    }
  }

  enviaSubscription = async (subscription) => {
    const res = await fetch(process.env.REACT_APP_API_URL+'/push', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no enviaSubscription',erro))
    if(!res) {
      return
    }
    if(res.success) {
      console.log("sucesso no post subscription", res)
    } else {
      console.error("erro ao enviar subscription", res.message)
    }
  }

  // Utility function
  // Chrome doesnt support base64String
  urlBase64ToUint8Array = (base64String) => {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  render() {
    return (
      <UserContext.Provider
        value={{ 
          ativaCupom: this.ativaCupom,
          atualizaCupons: this.atualizaCupons,
          atualizaCuponsUtilizados: this.atualizaCuponsUtilizados,
          atualizaInfosUser: this.atualizaInfosUser,
          buscaCupom: this.buscaCupom,
          cupons: this.state.cupons,
          cuponsUtilizados: this.state.cuponsUtilizados,
          faleConosco: this.faleConosco, 
          getCupomById: this.getCupomById,
          getDadosMeuPerfil: this.getDadosMeuPerfil,
          getOfertas: this.getOfertas,
          isAuth: this.state.isAuth,
          isLoadingUser: this.state.isLoadingUser,
          listaDesejos: this.state.ofertas,
          loadFromLocalStorage: this.loadFromLocalStorage,
          login: this.login,
          logout: this.logout,
          notificacoes: this.state.notificacoes,
          perfil: this.state.perfil,
          receberNotificacoes: this.receberNotificacoes,
          setDadosMeuPerfil: this.setDadosMeuPerfil,
          setFacebookToken: this.setFacebookToken,
          setPerfil: this.setPerfil,
          setToken: this.setToken,
          signup: this.signup,
          toggleDesejo: this.toggleDesejo,
          userToken: this.state.userToken,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

  
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }