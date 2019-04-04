import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    userToken: null,
    perfil: {
    }
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.setToken = this.setToken.bind(this)
    this.signup = this.signup.bind(this)
  }

  componentWillMount() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.setToken(userToken);
      return;
    }
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

  render() {
    return (
      <UserContext.Provider
        value={{ 
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          setToken: this.setToken,
          signup: this.signup
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

  
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }