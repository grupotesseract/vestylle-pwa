import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    userToken: null,
    fbToken: null,
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

  componentWillMount() {
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
    .then(response => response.json())
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
      this.getDadosMeuPerfil()
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

  setFacebookToken(fbResponse) {
    console.log(fbResponse)
    const fbToken = fbResponse.accessToken
    this.setState({
      fbToken
    })
    localStorage.setItem('fbToken', fbToken);
    this.getAPITokenFromFacebookToken(fbToken)
    .then((apiToken) => {
      console.log("setFacebookToken",apiToken)
      // this.setToken(apiToken)
    })
  }

  async getAPITokenFromFacebookData(fbToken) {
    console.log(fbToken)
    const bodyRequest = {
      email: "evandro.carreira@gmail.com",
      social_token: fbToken,
      nome: "Evandro Barbosa Carreira"
    }
    const res = await fetch(process.env.REACT_APP_API_URL+'/login/facebook', {
      method: 'PATCH',
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
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/27')
    .then(response => response.json())
    .catch(erro => console.error('Erro no getDadosMeuPerfil',erro))
    if(res.success) {
      const meuperfil = this.null2emptystring(res.data)
      this.setState({perfil: meuperfil})
      return meuperfil
    } else {
      throw res.message
    }
  }

  async setDadosMeuPerfil(perfil) {
    const res = await fetch(process.env.REACT_APP_API_URL+'/pessoas/27', {
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