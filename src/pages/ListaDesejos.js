import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import CupomBoasVindas from '../components/CupomBoasVindas';
import Breadcrumb from '../ui/Breadcrumb';

export default class ListaDesejos extends React.Component {

  state = {
  }

  componentDidMount() {

  }

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
          <RubikText>Seus produtos favoritos </RubikText>
          <RubikText>ficam salvos aqui</RubikText>
        </View>
        <RubikText bold={true}>A Lista de Desejos facilita suas compras.</RubikText>
      </View>
      <View style={{flexDirection:'row', marginTop: 10}}>
        <View style={{backgroundColor: 'white', flexGrow:1, padding: 10}}>
          <img 
            alt=""
            src={require('../assets/sinoalerta.png')}
            style={{padding:20, border: '1px solid #bdbabc', borderRadius: 10, maxWidth: 48, marginTop: 14}}
          />
        </View>
        <View style={{flexGrow: 1}}>
          <RubikText bold={true} style={{fontSize: 17, marginBottom:8}}>ALERTA DESCONTO</RubikText>
          <RubikText bold={true} style={{justifyContent:'flex-start', textAlign: 'left'}}>Adicionando seus produtos favoritos, nós podemos te avisar se ele entrar em oferta. </RubikText>
          <RubikText style={{justifyContent:'flex-start', textAlign: 'left'}}>Você pode desabilitar essa função em Area do Cliente > Meu Perfil</RubikText>
        </View>
      </View>
      <View style={{flexDirection:'row', marginBottom: 50}}>
        <View style={{backgroundColor: 'white', flexGrow:1, padding: 10}}>
          <img 
            alt=""
            src={require('../assets/bag.png')}
            style={{padding:20, border: '1px solid #bdbabc', borderRadius: 10, maxWidth: 48, marginTop: 14}}
          />
        </View>
        <View style={{flexGrow: 1}}>
          <RubikText bold={true} style={{fontSize: 17, marginTop:8, marginBottom:5}}>COMPRAS PRÁTICAS</RubikText>
          <RubikText bold={true} style={{justifyContent:'flex-start', textAlign: 'left'}}>Na hora das compras em nossa loja, a lista te ajuda.</RubikText>
          <RubikText style={{justifyContent:'flex-start', textAlign: 'left'}}>É só mostrá-la para um de nossos atendentes que ele encontra para você.</RubikText>
        </View>
      </View>

      <CupomBoasVindas/>

      <UserConsumer>
      {({ getDadosMeuPerfil, setDadosMeuPerfil }) => (<>
            
      </>
      )}
      </UserConsumer>
      <RodapeCompleto/>
    </View>
    )
  }
}