import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';

export default class MeuPerfil extends React.Component {


  render() {
    return ( <View style={{backgroundColor: 'black'}}>
        <UserConsumer>
        {({ logout }) => (<>
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