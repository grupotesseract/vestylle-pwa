import React from 'react';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import { Link, Redirect } from 'react-router-dom'
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import TextInput from '../ui/TextInput';
import { UserConsumer } from '../UserContext';

export default class EsqueceuSenha extends React.Component {

  state = {
    erroSenha: false,
    redirectTo: null,
    msgErro: '',
    login: '',
    password: ''
  }
  
  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-between', alignItems: 'center'}}>

        { this.state.redirectTo && (
          <Redirect to={this.state.redirectTo}/>
        )}
        <View
          style={{width: '80%', flexGrow:2, marginBottom: 'auto', justifyContent: 'center'}}>
          <img
            alt="Vestylle"
            src={require('../assets/logobranco.png')}
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </View>

        <View
          style={{width: '80%', justifySelf: 'center', flexGrow: 1}}>

          <RubikText style={styles.label}>Digite seu E-mail</RubikText>
          <TextInput
            style={styles.inputComBorda}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <UserConsumer>
          {({ setToken }) => (
          <ButtonBorder 
            title="PRÓXIMA"
            loading={this.state.loading}
            onPress={() => this.signInAsync(setToken)} 
          />
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

  signInAsync = async (setToken) => {
    const self = this;
    this.setState({loading:true})
    await this.fetchLogin()
    .then(jsonRes => {
      if(jsonRes.success) {
        const token = jsonRes.data.token
        setToken(token);
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

  fetchLogin = async () => {
    const res = await fetch('https://develop-api.vestylle.grupotesseract.com.br/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.login, password: this.state.password})
    })
    .then(response => response.json())
    .catch(erro => console.error('Login não rolou',erro))
    return res;
  }

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