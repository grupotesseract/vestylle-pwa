import React, { Component } from 'react';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto';
import SimpleMenu from '../components/SimpleMenu';
import SliderOfertas from '../components/SliderOfertas';
import SliderCupons from '../components/SliderCupons';
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import CupomBoasVindas from '../components/CupomBoasVindas';
import LaughingSmiling from '../ui/LaughingSmiling';
import ReactGA from 'react-ga';
import { UserConsumer } from '../UserContext';
import { LojaConsumer } from '../LojaContext';
import ListaProdutos from '../ui/ListaProdutos';
class Home extends Component {

  state = {
    windowSize: {
      sm: true,
      md: false,
      lg: false
    }
  }

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowSize: {
        sm: true,
        md: window.innerWidth > 1023,
        lg: window.innerWidth > 1366
      }
    })
  }

  componentDidMount() {
    ReactGA.pageview('/');
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return <>
      <Header/>
      <SimpleMenu
        windowSize={this.state.windowSize}
      />
      <View style={{
        paddingTop: 20
      }}>
        <View style={{position: 'relative'}}>
          <div style={{
            position: 'absolute',
            height: '55%',
            width: '100%',
            backgroundColor: '#55bcba',
            top: '15%',
          }}></div>
          <SliderCupons/>
        </View>
        <View 
          style={{
            alignItems:'center',
          }}
          className="hide-md"
          >
          <RubikText bold={true} style={{fontSize: 25}}>
          Preparamos
          </RubikText>
          
          <LaughingSmiling style={{fontSize: 30}}>
          benefícios exclusivos
          </LaughingSmiling>
          <RubikText bold={true} style={{fontSize: 25}}>
          para você
          </RubikText>
        </View>
            <View 
            className="hide-md"
            style={{
                alignItems:'center',
                margin: 20,
                padding: 5,
                paddingTop: 10,
                borderTop: 1,
                borderTopStyle: 'solid',
                borderColor: '#585756'
              }}>
              <RubikText 
                bold={true} 
                style={{ fontSize: 15, color: '#585756' }}>
                Com os cupons promocionais da
              </RubikText>
              <RubikText 
                bold={true} 
                style={{ fontSize: 15, color: '#585756' }}>
              Vestylle Megastore Jaú, você tem
              </RubikText>
              <RubikText 
                bold={true} 
                style={{ fontSize: 15, color: '#585756' }}>
                desconto o ano inteiro.
              </RubikText>
            </View>
      </View>

      <View 
        className="hide show-lg"
        >
        <View style={{
          flexDirection: 'row',
          display: 'flex'
        }}>
          <View style={{
            backgroundColor: '#55bcba',
            flexGrow: 1, 
            lineHeight: 1.8,
            alignItems: 'flex-end',
            justifyContent: 'center',
            color: 'white',
            width: '50%',
            fontSize: 22
          }}>
            <View style={{width: '20em', alignItems: 'center'}}>
              <RubikText bold={true} style={{fontSize: 30}}>
              Preparamos
              </RubikText>
              
              <LaughingSmiling style={{fontSize: 34, marginTop: -20, marginBottom: -15}}>
              benefícios exclusivos
              </LaughingSmiling>
              <RubikText bold={true} style={{fontSize: 30}}>
              para você
              </RubikText>
            </View>
          </View>
          <View style={{
            backgroundColor: '#1d1d1b',
            flexGrow: 1, 
            lineHeight: 1.8,
            alignItems: 'flex-start',
            justifyContent: 'center',
            color: 'white',
            width: '50%',
            fontSize: 22
          }}>
            <View style={{padding: 30,paddingLeft: 70}}>
              <RubikText> Com os cupons promocionais</RubikText>
              <RubikText> <i style={{display:'inline'}}>Vestylle Megastore Jaú</i>, você</RubikText>
              <RubikText> tem desconto o ano inteiro. </RubikText>
            </View>
          </View>
        </View>
      </View>
        <UserConsumer>
          {({isAuth}) => (
            this.state.windowSize.md  && !isAuth?
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'stretch',
              justifyContent: 'stretch',
              }}>
              <View style={{
                backgroundColor: '#1d1d1b',
                flexGrow: 1, 
                paddingRight: 70,
                lineHeight: 1.7,
                alignItems: 'flex-end',
                justifyContent: 'center',
                color: 'white',
                width: '50%',
                fontSize: 22
              }}>
                <RubikText> Para utilizar seus cupons basta</RubikText>
                <RubikText> apresentar a tela do seu celular </RubikText>
                <RubikText> para a atendente da loja</RubikText>
              </View>
              <View 
                style={{
                  flexGrow: 1, 
                  alignItems: 'flex-start', 
                  paddingLeft: 70, 
                  backgroundColor: "#feca03",
                  width: '50%',
                }}>
                <CupomBoasVindas/>
              </View>
            </View>:<>
            <CupomBoasVindas/>
            </>
      
          )}
        </UserConsumer>
      
      <View 
        className="hide-sm"
        style={{
          marginTop: 40,
          maxWidth: '100%'
        }}
        >
        <View style={{
          display: 'flex', 
          flexDirection: 'row',
        }}>

          <View
          style={{
            width: '50%', 
            alignItems: 'flex-end',
            zIndex: 2
          }}>
            <img 
              alt=""
              src={require('../assets/corpomulheres.jpg')}
              style={{width: '100%', maxWidth: '450px', maxHeight:'450px', margin: 20}}
            />
          </View>

          <View style={{
            width: '50%',
            zIndex: 1
          }}>
            <View style={{
              backgroundColor: '#55bcba',
              marginTop: 130,
              padding: 30,
              marginLeft: -150,
              paddingLeft: 150,
              maxWidth: 500
            }}>
            <img 
              alt="Vista-se com qualidade"
              src={require('../assets/vistasecomqualidade.png')}
              style={{maxWidth: 450, maxHeight: '400px'}}
            />
            </View>
          </View>
        </View>
      </View>
      <View style={{
        paddingTop:40,
      }}
      className="container"
      >
        <RubikText 
          bold={true} 
          style={{ 
            alignSelf: this.state.windowSize.md ? 'flex-start' : 'center', 
            fontSize: 20,
            padding: 10,
            marginBottom: 15
          }}>
          CONFIRA AS NOVIDADES
        </RubikText>
        <View style={{display: 'block'}}>
        {this.state.windowSize.md ? 
        <UserConsumer>
        {({listaDesejos, userToken}) => (
          <LojaConsumer>
          {({getOfertasComLike}) => (
            <ListaProdutos
              getOfertasComLike={getOfertasComLike}
              listaDesejos={listaDesejos}
              userToken={userToken}
              visualizacao="wide"
            />
          )}
          </LojaConsumer>
        )}
        </UserConsumer>
        :
        <View style={{position: 'relative'}}>
          <div style={{
            position: 'absolute',
            height: '55%',
            maxHeight: 220,
            width: '100%',
            backgroundColor: '#55bcba',
            top: '10%',
          }}></div>
          <SliderOfertas/>
        </View>
        }
        </View>
        <Link 
          to="/produtos"
        style={{
          backgroundColor: 'black',
          alignSelf:'center',
          padding: 10,
          paddingRight:25,
          paddingLeft:25,
          borderRadius: 5,
          marginBottom: 30
        }}>
          <RubikText 
            style={{
              color:'white', 
            }}
            bold={false}
          >
            TODOS OS PRODUTOS
          </RubikText>
        </Link>
      </View>
      <RodapeCompleto/>
    </>
    
  }
}

export default Home;