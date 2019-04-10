import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import CupomBoasVindas from '../components/CupomBoasVindas';

export default class ListaDesejos extends React.Component {

  state = {
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>
      <RubikText bold={true}>
        Lista de desejos
      </RubikText>
      <View>
        <RubikText>Seus produtos favoritos </RubikText>
        <RubikText>ficam salvos aqui</RubikText>
      </View>
      <RubikText>A lista de desejos facilita suas compras.</RubikText>
      <View>
        {/* icone */ }
        <View>
          <RubikText bold={true}>ALERTA DESCONTO</RubikText>
          <RubikText>Adicionando seus produtos favoritos, nós podemos te avisar se ele entrar em oferta. </RubikText>
          <RubikText>Você pode desabilitar essa função em Area do Cliente > Meu Perfil</RubikText>
        </View>
      </View>
      <View>
        {/* icone */ }
        <View>
          <RubikText bold={true}>COMPRAS PRÁTICAS</RubikText>
          <RubikText>Na hora das compras em nossa loja, a lista te ajuda.</RubikText>
          <RubikText>É só mostrá-la para um de nossos atendentes que ele encontra para você.</RubikText>
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