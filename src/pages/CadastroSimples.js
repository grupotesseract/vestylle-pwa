import React from 'react';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import TextInput from '../ui/TextInput';
import { Link } from 'react-router-dom'
import { UserConsumer } from '../UserContext';

export default class CadastroSimples extends React.Component {
  state = {
    cadastroConcluido: false,
    erroCadastro: false,
    passwordMismatch: false,
    loading: false,
    msgErro: '',
    login: '',
    password: '',
    passwordConfirm: ''
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', minHeight: '100%', justifyContent: 'space-between', alignItems: 'center'}}>

        <View
          style={{width: '80%', flexGrow:1, marginBottom: 'auto', justifyContent: 'center'}}>
          <img
            alt="Vestylle"
            src={require('../assets/logobranco.png')}
            style={{ width:'80%', height:60 }}
          />
          <RubikText style={this.styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={this.styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </View>

        <View
          style={{width: '80%'}}>

          <RubikText style={this.styles.label}>CPF ou E-mail</RubikText>
          <TextInput
            style={this.styles.inputComBorda}
            onChangeText={(login) => {this.setState({login})}}
            value={this.state.login}
          />
          <RubikText style={this.styles.label}>Crie uma senha</RubikText>
          <TextInput
            style={this.styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <RubikText style={this.styles.label}>Confirme sua senha</RubikText>
          <TextInput
            style={this.styles.inputComBorda}
            secureTextEntry={true}
            onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
            value={this.state.passwordConfirm}
            onBlur={this.blurPasswordConfirm}
          />
          { this.state.passwordMismatch && (
            <RubikText style={this.styles.erroText}>Campos de senha estão diferentes</RubikText>
          )}
          <UserConsumer>
          {({ setToken }) => (
            <ButtonBorder 
              title="CADASTRAR" 
              loading={this.state.loading}
              onPress={() => this.cadastrarNovoUsuario(setToken)} 
            />
          )}
          </UserConsumer>
        </View>
        <Link 
          to="Home"
          fontSize="12"
          style={{marginTop: 50, marginBottom: 25, color: 'white'}}
        >
        Saiba mais sobre o aplicativo Megastore Jaú
        </Link>
        { this.state.cadastroConcluido && (
          <Alert
            title = "Obrigado!"
            message = "Cadastro realizado com sucesso."
            btnText = "começar"
            onClickButton = {this.onClickAlertButton}
            dismissAlert = {this.onClickAlertButton}
          />
        )}
        { this.state.erroCadastro && (
          <Alert
            title = "Atenção"
            message = {this.state.msgErro}
            btnText = "OK"
            onClickButton = {this.dismissAlertErro}
            dismissAlert = {this.dismissAlertErro}
          />
        )}
        
      </ImageBackground>
    );
  }

  cadastrarNovoUsuario = async (setToken) => {
    this.setState({loading:true})
    await this.fetchCadastro()
    .then(jsonRes => {
      if(jsonRes.success) {
        console.log(jsonRes);
        const token = jsonRes.data.token.token
        setToken(token);
        this.setState({
          cadastroConcluido: true
        })
        return
      }
      const msgErro = jsonRes.message;
      this.setState({
        erroCadastro: true,
        msgErro
      })
    })
    .catch(error => console.error('Deu ruim memo:', error));
    this.setState({loading:false})
  };

  fetchCadastro = async () => {
    const params = JSON.stringify({email: this.state.login, password: this.state.password, nome:'teste', cpf: this.state.login})
    console.log(params)
    const res = await fetch('https://develop-api.vestylle.grupotesseract.com.br/api/pessoas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    })
    .then(response => response.json())
    .catch(error => console.error('Deu ruim:', error));
    return res;
  }

  dismissAlertErro = () => {
    this.setState({
      erroCadastro: false
    })
  }

  onClickAlertButton = () => {
    this.props.navigation.navigate('App');
  }

  blurPasswordConfirm = () => {
    if(this.state.password !== this.state.passwordConfirm) {
      this.setState({
        passwordMismatch: true
      })
    } else {
      this.setState({
        passwordMismatch: false
      })
    }
  }

  styles = {
    inputComBorda: {
      height: 40,
      width:'100%',
      borderColor: 'gray',
      color: 'white',
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: 'solid'
    },
    label: {
      color: '#feca03',
      marginTop: 5,
      textAlign: 'left'
    },
    erroText: {
      color: 'white',
      textAlign: 'left'
    },
    textoBranco: {
      color: '#FFFFFF',
      fontSize: 10,
      paddingLeft: 12,
      alignSelf: 'flex-start'
    }
  }
}