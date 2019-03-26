import React  from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = { 
    isAuth: false,
    perfil: {
    }
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.setState({isAuth: true});
  }

  logout() {
    this.setState({isAuth: false});
  }

  render() {
    return (
      <UserContext.Provider
        value={{ 
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }