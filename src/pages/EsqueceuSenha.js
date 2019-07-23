import React from 'react';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import { Link, Redirect } from 'react-router-dom'
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import ReactGA from 'react-ga';

export default class EsqueceuSenha extends React.Component {

  state = {
    email: '',
    erroRecover: false,
    emailEnviado: false,
    redirectTo: null,
    msgErro: '',
  }

  componentDidMount() {
    ReactGA.pageview('/esqueceusenha');
  }
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', height: window.innerHeight, minHeight: 450, justifyContent: 'space-between', alignItems: 'center'}}>

        { this.state.redirectTo && (
          <Redirect to={this.state.redirectTo}/>
        )}
        <View
          style={{width: '80%', flexGrow:2, marginBottom: 'auto', justifyContent: 'center'}}>
          <Link 
            to="/"
            style={{flexDirection: 'column'}}>
            <img
              alt="Vestylle"
              src={require('../assets/logobranco.png')}
              style={{ width:'80%', height:60 }}
            />
            <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
            <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
          </Link>
        </View>

        <View
          style={{width: '80%', justifySelf: 'center', flexGrow: 1}}>

          <RubikText style={styles.label}>Digite seu E-mail</RubikText>
          <input
            style={styles.inputComBorda}
            onChange={(email) => this.setState({email: email.target.value})}
            value={this.state.email}
          />
          <UserConsumer>
          {({ recoverPassword }) => (
          <ButtonBorder 
            title="PRÓXIMA"
            loading={this.state.loading}
            onPress={() => this.callRecover(recoverPassword)} 
          />
          )}
          </UserConsumer>
        </View>
        { this.state.emailEnviado && (
          <Alert
            title = "Veja seu email!"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.goHome}
            dismissAlert = {this.goHome}
          />
        )}
        { this.state.erroRecover && (
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

  callRecover(recoverPassword) {
    recoverPassword(this.state.email)
    .then((res) => {
      console.log(res)
      if(res && !res.success) {
        this.setState({
          erroRecover: true,
          msgErro: res.message
        })
        return
      }
      if(res && res.success) {
        this.setState({
          emailEnviado: true,
          msgErro: res.message
        })
        return
      }
    })
    .catch((e) => console.log('erro no callRecover', e))
  }

  goHome = () => {
    this.setState({redirectTo: '/'})
  }

  dismissAlertErro = () => {
    this.setState({
      erroRecover: false
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
    borderRadius: 5,
    marginBottom: 10
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