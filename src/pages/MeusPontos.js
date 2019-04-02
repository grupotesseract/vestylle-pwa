import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import RubikText from '../ui/RubikText';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto'
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class MeusPontos extends React.Component {

  state = {
    qtdPontos: 333,
  }

  render() {
    return ( <View>
      <Header/>
      <View style={{padding: 20, backgroundColor: "#1e1e1c", alignItems: 'center'}}>
        <Breadcrumb>
          <Link to="/meuspontos"><RubikText>Área do Cliente &gt;&nbsp;</RubikText></Link>
          <RubikText bold={true}>Meus pontos</RubikText>
        </Breadcrumb>
        <RubikText style={{color: 'white'}}>Suas compras</RubikText>
        <RubikText style={{color: 'white'}}>acumulam pontos</RubikText>

      <UserConsumer>
      {({ logout }) => (<>
        <View style={{width:100}}>
        <CircularProgressbar
          percentage={this.state.qtdPontos/10}
          text={this.state.qtdPontos}
          styles={{
            path: {
              stroke: '#55bcba'
            },
            trail: {
              stroke: '#585756'
            },
            text: {
              fill: 'white',
              fontSize: 23,
            }
          }}
        />
        </View>
      </>)}
      </UserConsumer>
      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}