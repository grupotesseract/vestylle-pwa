import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    userToken: null,
    fbData: null,
    userId: null,
    perfil: null,
    ofertas: []
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setToken = this.setToken.bind(this)
    this.setPerfil = this.setPerfil.bind(this)
    this.signup = this.signup.bind(this)
    this.getDadosMeuPerfil = this.getDadosMeuPerfil.bind(this)
    this.setDadosMeuPerfil = this.setDadosMeuPerfil.bind(this)
    this.setFacebookToken = this.setFacebookToken.bind(this)
    this.getOfertas = this.getOfertas.bind(this)
    this.toggleDesejo = this.toggleDesejo.bind(this)
    this.receberNotificacoes = this.receberNotificacoes.bind(this)
  }

  loadFromLocalStorage() {
    if(!this.state.isAuth) {
      const userToken = localStorage.getItem('userToken')
      const userId = localStorage.getItem('userId')
      if(userToken && userId) {
        this.setState({userToken, userId, isAuth: true})
        if(!this.state.perfil) {
          const perfil = JSON.parse(localStorage.getItem('perfil'))
          console.log("perfil carregado do localStorage", perfil)
          const ofertas = JSON.parse(localStorage.getItem('ofertas'))
          this.setState({perfil, ofertas})
        }
      }
    }
  }

  componentDidMount() {
    this.loadFromLocalStorage();
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
    // Pega registro do service worker
    if(!('serviceWorker' in navigator)) {
      console.log('sw not supported');
    } 
    if(('serviceWorker' in navigator)) {
      console.log('sw available (not ready)');
      navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) => {
        console.log('sw ready, registration:');
        console.log(serviceWorkerRegistration)

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
              this.registerOnPush(swReg);
            }).catch((e) => console.error(e));
          }
        });
      })
      .catch(err => console.log('Erro no register do sw:', err))
    }
  }

  enviaSubscription = async (subscription) => {
    console.log(subscription);

    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId+'/subscription', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer '+this.state.userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"subscription":subscription})
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no enviaSubscription',erro))
    if(!res) {
      return
    }
    if(res.success) {
      console.log("sucesso no post subscription", res)
    } else {
      throw res.message
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

  registerOnPush = (swReg) => {
    swReg.active.addEventListener("push", (event) => {
      console.log("push received");
      let title = (event.data && event.data.text()) || "Chegou uma mensagem!";
      let body = "Recebemos uma mensagem por push :)";
      let tag = "push-demo-tag";
      let icon = '/assets/icon.png';

      event.waitUntil(
        swReg.showNotification(title, { body, icon, tag })
      )
    });

    console.log(swReg)
  }

  render() {
    return (
      <UserContext.Provider
        value={{ 
          isAuth: this.state.isAuth,
          perfil: this.state.perfil,
          login: this.login,
          logout: this.logout,
          setToken: this.setToken,
          setPerfil: this.setPerfil,
          signup: this.signup,
          getDadosMeuPerfil: this.getDadosMeuPerfil,
          setDadosMeuPerfil: this.setDadosMeuPerfil,
          setFacebookToken: this.setFacebookToken,
          getOfertas: this.getOfertas,
          toggleDesejo: this.toggleDesejo,
          receberNotificacoes: this.receberNotificacoes,
          listaDesejos: this.state.ofertas 
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

  
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }