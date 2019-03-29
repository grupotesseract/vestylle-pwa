import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import Header from '../components/Header'

export default class MeuPerfil extends React.Component {


  render() {
    return ( <View>
        <UserConsumer>
        {({ logout }) => (<>
            <Header/>
            <h3>Meu Perfil</h3>
            <div>Autorizado</div>
            <button onClick={logout}>Logout</button>
        </>
        )}
        </UserConsumer>
    </View>
    )
  }
}