import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import CupomBoasVindas from '../components/CupomBoasVindas';
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import { FaRegHeart, FaSpinner } from 'react-icons/fa';
import Produto from '../ui/Produto';
import ReactGA from 'react-ga';

class ListagemDesejos extends React.Component {

  state = {
    listaDesejos: null,
    loading: false
  }

  componentDidMount() {
    this.props.getOfertas()
    .then((listaDesejos) => {
     this.setState({listaDesejos})
    })
    ReactGA.pageview('/listadesejos');
  }

  static getDerivedStateFromProps(props, state) {
    const loading = props.isAuth && props.listaDesejos === null
    if (props.listaDesejos !== state.listaDesejos) {
      return {
        listaDesejos: props.listaDesejos,
        loading
      };
    }

    // Return null to indicate no change to state.
    return null;
  }



  render() {
      if(this.state.loading) {
        return <View style={{ alignItems: 'center', alignSelf: 'stretch', paddingBottom: 100}}>
            <FaSpinner className="spin" style={{fontSize: 36}} />
          </View>
      }
      return !this.state.listaDesejos || this.state.listaDesejos.length < 1 ? (<>
        <View style={{alignItems: 'center'}}>
          <RubikText bold={true}>A Lista de Desejos facilita suas compras.</RubikText>
        </View>
        <View style={{flexDirection:'row', padding:15}}>
          <View style={{backgroundColor: 'white', flexGrow:1, padding: 10}}>
            <img 
              alt=""
              src={require('../assets/sinoalerta.png')}
              style={{padding:15, border: '1px solid #bdbabc', borderRadius: 5, maxWidth: 32, marginTop: 8}}
            />
          </View>
          <View style={{flexGrow: 1}}>
            <RubikText bold={true} style={{fontSize: 14, marginBottom:2}}>ALERTA DE DESCONTO</RubikText>
            <RubikText bold={true} style={{fontSize: 12, justifyContent:'flex-start', textAlign: 'left'}}>Adicionando seus produtos favoritos, nós podemos te avisar se ele entrar em oferta. </RubikText>
            <RubikText style={{fontSize: 12,justifyContent:'flex-start', textAlign: 'left'}}>Você pode desabilitar essa função em Area do Cliente > Meu Perfil</RubikText>
          </View>
        </View>
        <View style={{flexDirection:'row', marginBottom: 50, padding: 15}}>
          <View style={{backgroundColor: 'white', flexGrow:1, padding: 10}}>
            <img 
              alt=""
              src={require('../assets/bag.png')}
              style={{padding:15, border: '1px solid #bdbabc', borderRadius: 5, maxWidth: 32, marginTop: 14}}
            />
          </View>
          <View style={{flexGrow: 1}}>
            <RubikText bold={true} style={{fontSize: 14, marginTop:8, marginBottom:5}}>COMPRAS PRÁTICAS</RubikText>
            <RubikText bold={true} style={{fontSize: 12,justifyContent:'flex-start', textAlign: 'left'}}>Na hora das compras em nossa loja, a lista te ajuda.</RubikText>
            <RubikText style={{fontSize: 12,justifyContent:'flex-start', textAlign: 'left'}}>É só mostrá-la para um de nossos atendentes que ele encontra para você.</RubikText>
          </View>
        </View>

        <RubikText
          bold={true}
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 40,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            fontSize: 20,
            marginBottom: -15,
            alignSelf: 'flex-start',
            backgroundColor: '#55bcba',
            zIndex:2
          }}
        >COMO FUNCIONA?</RubikText>
        <View style={{
          backgroundColor:'#1d1e1b',
          padding: 20,
          alignItems: 'flex-start',
          zIndex:1,
          flexDirection: 'row'
        }}>
          <RubikText style={{
            color: 'white', 
            textAlign:'left',
            paddingTop: 15,
            paddingRight:10
            }}>
            No momento sua lista está vazia. 
            Para adicionar seus produtos favoritos aqui, 
            <b style={{display:'inline'}}> basta clicar no ícone <FaRegHeart/></b> 
            no canto inferior do produto.</RubikText>
          <img alt="miniatura da tela"
            src={require('../assets/minilike.png')}
            style={{
              marginTop: -70,
              minHeight: 200
            }}/>
        </View>
        <View style={{
          backgroundColor:'#585756', 
          padding: 20, 
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 50,
          boxShadow: '0 0 10px black'
          }}>
          <img alt="clique no coração"
            src={require('../assets/like.png')}
            style={{
              maxWidth: 70,
              marginRight: 20
            }}/>
          <RubikText bold={true} style={{fontSize: 12, color: 'white'}}>Produto adicionado à lista.</RubikText>
        </View>
        <CupomBoasVindas/>
      </> ):(<>
        {this.state.listaDesejos.map((desejo, key) => (
          <View key={key} style={{position: 'relative'}}>
            <div style={{
              position: 'absolute',
              height: '45%',
              width: '100%',
              backgroundColor: '#55bcba',
              top: '12%',
              zIndex:1
            }}></div>
            <View style={{
                width:'93%', 
                alignSelf:'center',
                marginBottom: '100px',
                zIndex:2
              }}>
              <Produto
                key={key}
                id={desejo.id}
                img={desejo.urlFoto}
                liked={true}
                titulo={desejo.titulo}
                subtitulo={desejo.subtitulo}
              />
            </View>
          </View>
        ))}      
      </>)
  }
}

export default class ListaDesejos extends React.Component {

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>
          Lista de desejos
        </RubikText>
      </Breadcrumb>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <LaughingSmiling>Seus produtos favoritos </LaughingSmiling>
          <LaughingSmiling>ficam salvos aqui</LaughingSmiling>
        </View>
      </View>

      <UserConsumer>
      {({ getOfertas, listaDesejos, isAuth }) => (<>
          <ListagemDesejos
            getOfertas={getOfertas}
            listaDesejos={listaDesejos}
            isAuth={isAuth}
          />
      </>
      )}
      </UserConsumer>
      <RodapeCompleto/>
    </View>
    )
  }
}