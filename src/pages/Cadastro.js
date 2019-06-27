import React, { Component } from 'react';
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import { FaFacebook, FaUserCircle, FaSpinner } from 'react-icons/fa';
import TouchableHighlight from '../ui/TouchableHighlight';
import { Link, Redirect } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { UserConsumer } from '../UserContext';
import ReactGA from 'react-ga';

class FBButton extends Component {

  state = {
    redirectUri: null
  }
  
  constructor() {
    super();
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  componentDidMount() {
    const redirectUri = window.location.protocol+"//"+window.location.host+"/cadastro"
    this.setState({
      redirectUri 
    })
  }

  clickHandler(onClick, isProcessing) {
    this.props.loadingOn();
    console.log("redirectURI",this.state.redirectUri)
    onClick()
  }

  render() {
    return <FacebookLogin
            appId="654012085033078" 
            fields="name,email,picture"
            callback={(res) => this.responseFacebook(res)}
            redirectUri={this.state.redirectUri}
            render={renderProps => {
              return (
              <TouchableHighlight 
                style={this.styles.botaoQuadrado}
                onPress={() => this.clickHandler(renderProps.onClick, renderProps.isProcessing)}>
                  <FaFacebook
                    size={15}
                    color="white"
                  />
                  <RubikText style={this.styles.fontBotao}> Login com FACEBOOK</RubikText>
              </TouchableHighlight>
            )}}
          ></FacebookLogin>
  }

  responseFacebook(response) {
    this.props.setFacebookToken(response)
    .then((res) => {
      console.log("resultado setfacebooktoken", res)
      if(res) {
        this.props.loginDone()
      }
    })
  }

  styles = {
    botaoQuadrado: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: 20,
      padding: 6,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'solid',
      justifyContent: 'flex-start'
    },
    fontBotao: {
      fontSize: 12,
      marginLeft: 7
    },
  }
}

class Cadastro extends Component {
  state = {
    redirectTo: null,
    loading: false
  }

  loadingOn = () => {
    this.setState({loading: true})
  }

  loadingOff = () => {
    this.setState({loading: false})
  }

  constructor() {
    super()
    this.loginDone = this.loginDone.bind(this)
  }

  componentDidMount() {
    ReactGA.pageview('/cadastro');
  }

  render() {
    return <ImageBackground
      source={require('../assets/fundocadastro.jpg')}
      style={{width: '100%', height: '100vh', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>

        { this.state.redirectTo && (
          <Redirect to={this.state.redirectTo}/>
        )}
        <Link to="/"
          style={{
            alignSelf: 'flex-start',
            marginBottom: 'auto'  
          }}
        >
          <img
            alt="Vestylle"
            src={require('../assets/logobranco.png')}
            style={{ width:'80%', maxWidth: 400,  marginLeft: 15, marginTop: 50}}
          />
        </Link>

        { this.state.loading ? (
          <View style={{ alignItems: 'center', alignSelf: 'stretch', paddingBottom: 100}}>
            <FaSpinner color="white" className="spin" style={{fontSize: 36}} />
          </View>
        ):(
        <>
          <View style={this.styles.rightAlign}>
            <RubikText style={{color:'#FFFFFF', textAlign: 'left', paddingRight: 20}}>Faça seu cadastro e receba benefícios exclusivos</RubikText>
            <UserConsumer>
            {({ setFacebookToken }) => (
              <FBButton
                setFacebookToken={setFacebookToken}
                loginDone={this.loginDone}
                loadingOn={this.loadingOn}
              />
            )}
            </UserConsumer>
            <Link
            style={this.styles.botaoQuadrado}
            to="cadastrosimples"
            >
              <FaUserCircle
                name="user-circle"
                size={15}
                color="white"
              />
              <RubikText style={this.styles.fontBotao}> Cadastrar com CPF ou E-MAIL</RubikText>
            </Link>
          </View>

          <View style={this.styles.fullCenter}>
            <RubikText style={this.styles.textoSmall}>JÁ POSSUI CADASTRO? </RubikText>
            <Link
              to="Login"
              fontSize="8"
              style={this.styles.textoSmall}
            >&nbsp; ACESSE SUA CONTA
            </Link>
          </View>
        </>
        )}

    </ImageBackground>
  }

  loginDone() {
    this.setState({
      loading: false,
      redirectTo : '/areacliente'
    })
  }

  styles = {
    textoSmall: {
      color: '#FFFFFF',
      fontSize: 10
    },
    fontBotao: {
      fontSize: 12,
      marginLeft: 7
    },
    rightAlign: {
      flexDirection: 'column',
      width: '80%',
      color: '#FFFFFF',
      paddingBottom: 30,
    },
    fullCenter: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 25,
      marginTop: 10
    },
    botaoQuadrado: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: 20,
      padding: 6,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'solid',
      justifyContent: 'flex-start'
    },
  }
}

export default Cadastro;