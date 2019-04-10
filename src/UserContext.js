import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    userToken: null,
    fbData: null,
    userId: null,
    perfil: {}
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setToken = this.setToken.bind(this)
    this.signup = this.signup.bind(this)
    this.getDadosMeuPerfil = this.getDadosMeuPerfil.bind(this)
    this.setDadosMeuPerfil = this.setDadosMeuPerfil.bind(this)
    this.setFacebookToken = this.setFacebookToken.bind(this)
  }

  componentDidMount() {
    /*
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.setToken(userToken);
      return;
    }
    */
  }

  async signup(login, passwd) {
    const params = JSON.stringify({email: login, password: passwd})
    console.log(params)
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => {
      const jsonRes = response.json()
      if(jsonRes.success) {
        this.setToken(jsonRes.data.token.token)
        this.setPerfil(jsonRes.data.pessoa)
      }
      return jsonRes
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
    if(res.success) {
      const meuPerfil = res.data.pessoa
      const userToken = res.data.token
      this.setToken(userToken)
      this.setPerfil(meuPerfil)
    }
    return res;
  }

  logout() {
    console.log('LOGOUT')
    localStorage.setItem('userToken', null);
    this.setState({isAuth: false});
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
    const fbData = fbResponse
    this.setState({
      fbData
    })
    localStorage.setItem('fbData', fbData);
    return this.getAPITokenFromFacebookData(fbData)
    .then((response) => {
      if(response.success) {
        const loginData = response.data
        const perfil = loginData.pessoa
        const userToken = loginData.token
        this.setToken(userToken)
        this.setPerfil(perfil)
      }
    })
  }

  setPerfil(perfil) {
    this.setState({
      userId: perfil.id,
      perfil: this.null2emptystring(perfil)
    })
    localStorage.setItem('userId', perfil.id);
    localStorage.setItem('perfil', perfil);
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

  async getDadosMeuPerfil() {
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/'+this.state.userId)
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(perfil)
    })
    .then(response => response.json())
    .catch(erro => console.error('Erro no login',erro))
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

  render() {
    return (
      <UserContext.Provider
        value={{ 
          isAuth: this.state.isAuth,
          perfil: this.state.perfil,
          login: this.login,
          logout: this.logout,
          setToken: this.setToken,
          signup: this.signup,
          getDadosMeuPerfil: this.getDadosMeuPerfil,
          setDadosMeuPerfil: this.setDadosMeuPerfil,
          setFacebookToken: this.setFacebookToken
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

  
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }