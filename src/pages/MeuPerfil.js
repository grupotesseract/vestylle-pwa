import React from 'react';
import { UserConsumer } from '../UserContext';

export default class MeuPerfil extends React.Component {


  render() {
    return ( <div>
        <UserConsumer>
        {({ logout }) => (<>
            <h3>Meu Perfil</h3>
            <div>Autorizado</div>
            <button onClick={logout}>Logout</button>
        </>
        )}
        </UserConsumer>
    </div>
    )
  }
}