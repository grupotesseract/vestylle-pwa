import React, { Component } from 'react';
import ImageBackground from '../ui/ImageBackground';
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import { FaFacebook, FaUserCircle } from 'react-icons/fa';
import TouchableHighlight from '../ui/TouchableHighlight';
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { UserConsumer } from '../UserContext';


class Cadastro extends Component {
  render() {
    return <ImageBackground
      source={require('../assets/fundocadastro.jpg')}
      style={{width: '100%', height: '100%', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>

        <img
          alt="Vestylle"
          src={require('../assets/logobranco.png')}
          style={{ width:'80%', maxWidth: 400, alignSelf: 'flex-start', marginLeft: 15, marginTop: 50, marginBottom: 'auto' }}
        />

        <View style={this.styles.rightAlign}>
          <RubikText style={{color:'#FFFFFF', textAlign: 'left'}}>Faça seu cadastro e receba benefícios exclusivos</RubikText>


        <UserConsumer>
        {({ setFacebookToken }) => (
          <FacebookLogin
            appId="654012085033078" 
            fields="name,email,picture"
            callback={(response) => this.responseFacebook(response, setFacebookToken)}
            render={renderProps => (
              <TouchableHighlight 
                style={this.styles.botaoQuadrado}
                onPress={renderProps.onClick}>
                  <FaFacebook
                    size={15}
                    color="white"
                  />
                  <RubikText style={this.styles.fontBotao}> Cadastrar com FACEBOOK</RubikText>
              </TouchableHighlight>
            )}
          ></FacebookLogin>
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
          <View style={this.styles.fullCenter}>
            <Link
              to="Home"
              style={this.styles.textoSmall}
            >Sobre o programa Cliente Vestylle Megastore Jaú
            </Link>
          </View>
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


    </ImageBackground>
  }
  
  responseFacebook = (response,setFacebookToken) => {
    setFacebookToken(response.accessToken)
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
      width: '70%',
      color: '#FFFFFF',
      paddingBottom: 40
    },
    botaoQuadrado: {
      marginTop: 3,
      marginBottom: 3,
      marginRight: 30,
      padding: 6,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'solid',
      justifyContent: 'flex-start'
    },
    fullCenter: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 25,
      marginTop: 10
    }
  }
}

export default Cadastro;