import React from 'react';
import ButtonBorder from '../ui/ButtonBorder';
import RubikText from '../ui/RubikText';
import Alert from '../ui/Alert';
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import TextInput from '../ui/TextInput';
import { Link, Redirect } from 'react-router-dom'
import { UserConsumer } from '../UserContext';
import ReactGA from 'react-ga';

export default class CadastroSimples extends React.Component {
  state = {
    cadastroConcluido: false,
    erroCadastro: false,
    passwordMismatch: false,
    formValido: false,
    loading: false,
    msgErro: '',
    login: '',
    password: '',
    passwordConfirm: '',
    redirectTo: null
  }

  componentDidMount() {
    ReactGA.pageview('/cadastrosimples');
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', height: window.innerHeight, minHeight: 450, justifyContent: 'space-between', alignItems: 'center'}}>

        <View 
        className="container container-sm"
        style={{height: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>

        { this.state.redirectTo && (
          <Redirect to={this.state.redirectTo}/>
        )}
        <View
          style={{width: '80%', flexGrow:1, marginBottom: 'auto', justifyContent: 'center'}}>
        <Link to="/" style={{flexDirection:'column'}}>
          <img
            alt="Vestylle"
            src={require('../assets/logobranco.png')}
            style={{  height:60 }}
          />
          <RubikText style={this.styles.textoBranco}>Faça seu cadastro </RubikText>
          <RubikText style={this.styles.textoBranco}>e receba benefícios exclusivos</RubikText>
        </Link>
        </View>

        <View
          style={{}}>
          <UserConsumer>
          {({ signup }) => (
          <form onSubmit={(e) => this.cadastrarNovoUsuario(signup, e)}>
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
              onBlur={this.checkPasswordConfirm}
            />
            <RubikText style={this.styles.label}>Confirme sua senha</RubikText>
            <TextInput
              style={this.styles.inputComBorda}
              secureTextEntry={true}
              onChangeText={this.handleConfirmPasswordChange}
              value={this.state.passwordConfirm}
              onBlur={this.checkPasswordConfirm}
            />
            { this.state.passwordMismatch && (
              <RubikText style={this.styles.erroText}>Campos de senha estão diferentes</RubikText>
            )}
            <ButtonBorder 
              title="CADASTRAR" 
              submit={true}
              loading={this.state.loading}
              disabled={!this.state.formValido}
            />
          </form>
          )}
          </UserConsumer>
        </View>
        <Link 
          to="/"
          fontSize="12"
          style={{marginTop: 50, marginBottom: 25, color: '#feca03', fontSize:12}}
        >&nbsp;</Link>
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
        </View> 
      </ImageBackground>
    );
  }

  cadastrarNovoUsuario = async (signup, event) => {
    if(event) {
      event.preventDefault()
    }
    if(!this.state.formValido) return;
    const self = this;
    this.setState({loading:true})
    await signup(this.state.login, this.state.password)
    .then(jsonRes => {
      if(jsonRes.success) {
        self.setState({
          cadastroConcluido: true,
          loading: false
        })
        return
      }
      let msgErro = jsonRes.message;
      if(jsonRes.errors) {
        msgErro = ""
        Object.keys(jsonRes.errors).map((campo) => {
          msgErro += " "+jsonRes.errors[campo]
          return msgErro
        })
      }
      self.setState({
        erroCadastro: true,
        loading: false,
        msgErro
      })
    })
    .catch(error => console.error('Deu ruim memo:', error));
  };

  dismissAlertErro = () => {
    this.setState({
      erroCadastro: false
    })
  }

  onClickAlertButton = () => {
    this.setState({ redirectTo: '/areacliente'})
  }

  handleConfirmPasswordChange = async (passwordConfirm) => {
   await this.setState({passwordConfirm})
   if(passwordConfirm.length > 4) {
    console.log(passwordConfirm, passwordConfirm.length)
    if(this.state.passwordMismatch) {
      this.checkPasswordConfirm();
    }
   }
  }

  checkPasswordConfirm = () => {
    console.log(this.state.password,this.state.passwordConfirm)
    if(this.state.password !== this.state.passwordConfirm && 
      this.state.password && 
      this.state.passwordConfirm) 
    {
      this.setState({
        passwordMismatch: true,
        formValido: false
      })
    } else {
      this.setState({
        passwordMismatch: false
      })
      if(this.state.password && this.state.passwordConfirm) {
        this.setState({
          formValido: true
        })
      }
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