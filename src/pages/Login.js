import React from 'react';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import { Link, Redirect } from 'react-router-dom'
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import TextInput from '../ui/TextInput';
import { UserConsumer } from '../UserContext';

export default class LoginScreen extends React.Component {

  state = {
    erroLogin: false,
    redirectTo: null,
    msgErro: '',
    login: '',
    password: ''
  }
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100vh', justifyContent: 'space-between', alignItems: 'center'}}>

        { this.state.redirectTo && (
          <Redirect to={this.state.redirectTo}/>
        )}
        <View
          style={{width: '80%', flexGrow:1, marginBottom: 'auto', justifyContent: 'center'}}>
          <img
            alt="Vestylle"
            src={require('../assets/logobranco.png')}
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </View>

        <View
          style={{width: '80%'}}>

          <RubikText style={styles.label}>CPF ou E-mail</RubikText>
          <UserConsumer>
          {({ login }) => (
          <form onSubmit={(e) => this.signInAsync(login, e)}>
            <TextInput
              style={styles.inputComBorda}
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}
            />
            <RubikText style={styles.label}>Senha</RubikText>
            <TextInput
              style={styles.inputComBorda}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <Link
              to="/esqueceusenha"
              style={{color: '#feca03', marginTop: 10, marginBottom: 12, fontSize: 14, justifyContent: 'flex-start'}}>
              <RubikText>Esqueceu sua senha?</RubikText>  
            </Link>
            <ButtonBorder 
              title="LOGIN"
              submit={true}
              loading={this.state.loading}
            />
          </form>
          )}
          </UserConsumer>
        </View>
        <Link 
          navigation={this.props.navigation}
          to="/"
          fontSize="12"
          style={{marginTop: 100, marginBottom: 25, color: "#feca03", fontSize: 12}}
        >
          Saiba mais sobre o aplicativo Megastore Jaú
        </Link>
        { this.state.erroLogin && (
          <Alert
            title = "Erro"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
      </ImageBackground>
    );
  }

  signInAsync = async (login, event) => {
    if(event) {
      event.preventDefault()
    }
    const self = this;
    this.setState({loading:true})
    await login(this.state.login, this.state.password)
    .then(jsonRes => {
      if(jsonRes.success) {
        self.setState({ redirectTo: '/areacliente'});
        return;
      }
      const msgErro = jsonRes.message;
      self.setState({
        erroLogin: true,
        loading: false,
        msgErro
      })
    })
    .catch(erro => {
      self.setState({
        erroLogin: true, 
        msgErro: erro.toString(),
        loading: false
      })
    })
  };

  dismissAlertErro = () => {
    this.setState({
      erroLogin: false
    })
  }
}

const styles = {
  inputComBorda: {
    height: 40,
    width:'100%',
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5
  },
  label: {
    color: '#feca03',
    marginTop: 5,
    textAlign: 'left'
  },
  textoBranco: {
    color: '#FFFFFF',
    fontSize: 10,
    paddingLeft: 12,
    alignSelf: 'flex-start'
  }
}