import React, { Component } from 'react';
import Header from '../components/Header'
import MiniRodape from '../components/MiniRodape';
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import { FaUserAlt, FaStar, FaHeart, FaBell } from 'react-icons/fa';
import Breadcrumb from '../ui/Breadcrumb';
import { UserConsumer } from '../UserContext';

class AreaCliente extends Component {

  render() {
    return <>
      <Header/>
      <View style={{backgroundImage: 'linear-gradient(#585756, #1d1e1b)', flexGrow: 1}}>
        <Breadcrumb><RubikText bold={true}>Área do Cliente</RubikText></Breadcrumb>

        <View style={{flexDirection:'row', textAlign: 'center'}}>
          <View style={{width: '20%'}}>
          </View>
          <UserConsumer>
          {({perfil}) => {
            if(!perfil) return
            return (
            <View style={{width:'60%',justifyContent: 'center', alignItems:'center', padding: 5}}>
              <RubikText style={{color: 'white', fontSize: 20}}>Olá {perfil.nomeSimples || perfil.nome}{perfil.genero !== '' ? ",":"!"}</RubikText>
              {perfil.genero && perfil.genero === 'Feminino' &&
                <RubikText style={{color: 'white', fontSize: 20}}>
                  seja bem-vinda!
                </RubikText>
              }
              {perfil.genero && perfil.genero === 'Masculino' &&
                <RubikText style={{color: 'white', fontSize: 20}}>
                  seja bem-vindo!
                </RubikText>
              }
            </View>
          )}}
          </UserConsumer>
          <Link 
            to="/adicionarcupom"
            style={{width:'20%', backgroundColor:'#feca03', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, flexDirection: 'column', padding: 5}}>
            <img
              alt=""
              src={require('../assets/qrcode.png')}
              style={{ height: 32, width:32, flexGrow: 0 }}
            />
            <RubikText style={{fontSize: 10}}>Adicionar cupom</RubikText>
          </Link>
        </View>

        <View style={{marginTop: 20, paddingRight: 20, paddingLeft: 20, flexDirection: 'row'}}>
          <Link to="/meuperfil" style={this.style.btnMeuPerfil}>
            <FaUserAlt size={64} color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>Meu Perfil</RubikText>
          </Link>
          <Link to="/meuspontos" style={this.style.btnMeuPerfil}>
            <FaStar size={64} color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>Meus Pontos</RubikText>
          </Link>
        </View>

        <View style={{padding: 20, paddingTop: 0, flexDirection: 'row'}}>
          <Link to="/listadesejos" style={this.style.btnMeuPerfil}>
            <FaHeart size={64} color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>Lista de Desejos</RubikText>
          </Link>
          <Link to="/meuscupons" style={this.style.btnMeuPerfil}>
            <img
              alt=""
              src={require('../assets/qrcode.png')}
              style={{ height: 64, width:64, flexGrow: 0 }}
            />
            <RubikText style={this.style.fonteBotao} bold={true}>Meus Cupons</RubikText>
          </Link>
        
        </View>

              {/*}
        <UserConsumer>
          {({ receberNotificacoes }) => (<>
          <View style={{paddingRight: 10, paddingLeft: 10, flexDirection: 'row'}}>
            <button 
              style={this.style.btnMeuPerfil}
              onClick={receberNotificacoes}>
              <FaBell size={64} color="#1e1e1c"/>
              <RubikText style={this.style.fonteBotao} bold={true}>Ativar notificações</RubikText>
            </button>
          </View>
          </>)}
        </UserConsumer>
          */}
      </View>
      <MiniRodape/>
      </>
    
  }


  style = {
    btnMeuPerfil: {
      backgroundColor: 'white',
      flexDirection: 'column',
      borderRadius: 5,
      margin: 7,
      padding: 10,
      paddingTop: 20,
      flex: 1
    },
    fonteBotao: {
      textTransform: 'uppercase',
      margin: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#1e1e1c'
    }
  }
}

export default AreaCliente;