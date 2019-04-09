import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';

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