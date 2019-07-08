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
        <View style={{
          alignItems:'center',
        }}>
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
      </View>

        <UserConsumer>
          {({isAuth}) => (
            this.state.windowSize.md  && !isAuth?
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'stretch',
              justifyContent: 'stretch',
              marginTop: 50
              }}>
              <View style={{
                backgroundColor: '#1d1d1b',
                flexGrow: 1, 
                paddingRight: 70,
                lineHeight: 1.8,
                alignItems: 'flex-end',
                justifyContent: 'center',
                color: 'white',
                fontSize: 22
              }}>
                <RubikText> Com os cupons promocionais</RubikText>
                <RubikText> <i style={{display:'inline'}}>Vestylle Megastore Jaú</i>, você</RubikText>
                <RubikText> tem desconto o ano inteiro. </RubikText>
              </View>
              <View style={{flexGrow: 1, alignItems: 'flex-start', paddingLeft: 20, backgroundColor: "#feca03",}}>
                <CupomBoasVindas/>
              </View>
            </View>:<>
            <View style={{
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
            <CupomBoasVindas/>
            </>
      
          )}
        </UserConsumer>
      
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