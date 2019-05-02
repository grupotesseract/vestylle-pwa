import React, { Component } from 'react';
import Header from '../components/Header'
import MiniRodape from '../components/MiniRodape';
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import { FaUserAlt, FaStar, FaHeart } from 'react-icons/fa';
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
          {({perfil}) => (
          <View style={{width:'60%',justifyContent: 'center', alignItems:'center', padding: 5}}>
            <RubikText style={{color: 'white', fontSize: 20}}>Olá {perfil.nomeSimples || perfil.nome}!</RubikText>
            {/* <RubikText style={{color: 'white', fontSize: 20}}>seja bem-vinda</RubikText> */}
          </View>
          )}
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

        <View style={{marginTop: 20, paddingRight: 10, paddingLeft: 10, flexDirection: 'row'}}>
          <Link to="/meuperfil" style={this.style.btnMeuPerfil}>
            <FaUserAlt size={64} color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>Meu Perfil</RubikText>
          </Link>
          <Link to="/meuspontos" style={this.style.btnMeuPerfil}>
            <FaStar size={64} color="#1e1e1c"/>
            <RubikText style={this.style.fonteBotao} bold={true}>Meus Pontos</RubikText>
          </Link>
        </View>

        <View style={{paddingRight: 10, paddingLeft: 10, flexDirection: 'row'}}>
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
        <button 
          style={this.style.btnMeuPerfil}
          onClick={this.receberNotificacoes}>
          Receber notificações
        </button>
      </View>
      <MiniRodape/>
      </>
    
  }

  receberNotificacoes = () => {
    // Pega registro do service worker
    if(!('serviceWorker' in navigator)) {
      console.log('sw not supported');
    } 
    if(('serviceWorker' in navigator)) {
      console.log('sw available (not ready)');
      navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) => {
        console.log('sw ready, registration:');
        console.log(serviceWorkerRegistration)

        // Pede permissão para exibir notificações
        // (ou avisa que bloqueou)
        if( Notification.permission === 'denied' ) {
          alert('Você proibiu as notificações, redefina as configurações para receber mensagens')
        }
        Notification.requestPermission((status) => {
          console.log('Notification status', status)
          if(status === 'granted') {
            let swReg = serviceWorkerRegistration;

            const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
            const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);
      
            swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            }).then((subscription) => {
              console.log('subscription', subscription)
              this.registerOnPush(swReg);
            });
          }
        });
      })
      .catch(err => console.log('Erro no register do sw:', err))
    }
  }

  registerOnPush = (swReg) => {
    swReg.active.addEventListener("push", (event) => {
      console.log("push received");
      let title = (event.data && event.data.text()) || "Yay a message";
      let body = "We have received a push message";
      let tag = "push-simple-demo-notification-tag";
      let icon = '/assets/my-logo-120x120.png';

      event.waitUntil(
        swReg.showNotification(title, { body, icon, tag })
      )
    });

    console.log(swReg)
  }

  style = {
    btnMeuPerfil: {
      backgroundColor: 'white',
      flexDirection: 'column',
      borderRadius: 5,
      margin: 10,
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