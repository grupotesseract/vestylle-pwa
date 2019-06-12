import React, { Component } from 'react';
import RubikText from '../ui/RubikText';
import MiniRodape from './MiniRodape'
import View from '../ui/View';
import { FaClock, FaMapMarker, FaWhatsapp, FaPhone } from 'react-icons/fa';
import TouchableHighlight from '../ui/TouchableHighlight';
import { MdEmail } from 'react-icons/md';
import { LojaConsumer } from '../LojaContext';

class DadosRodape extends Component {

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  render() {
    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }
    return <>
      <View style={this.style.container}>
        <img
          alt="Vestylle"
          src={require('../assets/logofull.png')}
          style={{ width:'70%', alignSelf: 'center', maxWidth: 200 }}
        />
        <RubikText bold={true} style={{fontSize: 19, marginTop: 0}}>Estamos te esperando</RubikText>
        <View style={Object.assign({},this.style.toLeft, this.style.paddingTopBottom)}>
          <RubikText bold={true} style={{fontSize: 14}}>
          <FaClock
            size={14}
          /> 
          Horário de funcionamento</RubikText>
          <RubikText style={{fontSize: 14}}>Segunda a Sexta 9h as 18h</RubikText>
          <RubikText style={{fontSize: 14}}>Sábados 9h as 17h</RubikText>
        </View>
        <RubikText style={{fontSize: 14}}>
          <FaMapMarker
            size={14}
          />
          {dadosLoja.endereco}
        </RubikText>
        <a href="http://maps.apple.com/?ll=-22.2955408,-48.5574577,17">
          <RubikText bold={true} style={{fontSize: 14, textDecorationLine: 'underline'}}>VER LOCALIZAÇÃO NO MAPA</RubikText>
        </a>
      </View>

      <View style={this.style.faleConosco}>
        <View style={this.style.linhaDuvidas}>
          <View style={this.style.duvidas}>
            <RubikText bold={true} style={{color: "white", alignItems: "center"}}>
              DÚVIDAS ?
            </RubikText>
          </View>
          <img
            alt=""
            src={require('../assets/atendente.png')}
            style={{ height: 30, width:30, flexGrow: 0, marginRight: 10, marginLeft: 10 }}
          />
          <View style={this.style.faleComAtendentes}>
            <RubikText bold={true} style={{color: "#feca03"}}>FALE COM UM DE</RubikText>
            <RubikText bold={true} style={{color: "#feca03"}}>NOSSOS ATENDENTES</RubikText>
          </View>
        </View>
        {dadosLoja.whatsapp &&
        <View style={{flexDirection: "row", paddingTop:10}}>
          <RubikText style={{color: "white", paddingLeft: 20}}>
            Iniciar conversa pelo 
          </RubikText>
          <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp))} style={{flexGrow: 1, justifyContent:"flex-start"}}>
            <RubikText style={{ color: "#feca03", textDecorationLine: 'underline' }}>&nbsp;Whatsapp</RubikText>
          </TouchableHighlight>
        </View>
        }
        <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>

          {dadosLoja.whatsapp &&
          <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp))}>
            <RubikText style={{ color: "#feca03", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
            <FaWhatsapp
              size={14}
            />{dadosLoja.whatsapp}
            </RubikText>
          </TouchableHighlight>
          }
          {dadosLoja.whatsapp2 &&
          <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp2))}>
            <RubikText style={{ color: "#feca03", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
            <FaWhatsapp
              size={14}
            />(14) 2104-3500
            </RubikText>
          </TouchableHighlight>
          }
        </View>

        { dadosLoja.telefone &&
        <>
        <View style = {{alignItems: 'flex-start', flexGrow: 1, alignSelf: 'stretch'}}>
          <RubikText style={{color: "white", paddingTop: 20, paddingLeft: 20 }}>
            Ou se preferir, você pode entrar em
          </RubikText>
          <RubikText style={{color: "white", paddingLeft: 20}}>
            contato com a loja pelo telefone
          </RubikText>
        </View>
        <a href={"tel:"+this.onlyNumbers(dadosLoja.telefone)}>
          <RubikText style={{ color: "white", marginTop: 5}}>
            <FaPhone
            size={14}
            style={this.style.icon}
          />{dadosLoja.telefone}
          </RubikText>
        </a>
        </>
        }
        { dadosLoja.email &&
        <a href={"mailto:"+dadosLoja.email}
          style = {this.style.email}
        >
          <RubikText style={{ color: "white"}}>
            <MdEmail
            size={14}
            style={{color:"#feca03", paddingTop: 5}}
          /> {dadosLoja.email}
          </RubikText>
        </a>
        }
      </View>
    </>
  }

  style = {
    container: {
      backgroundColor: "#ebebeb",
      alignItems: "center",
      paddingTop: 23,
      paddingBottom: 25,
      marginTop: 'auto'
    },
    paddingTopBottom: {
      paddingBottom: 18,
      paddingTop: 18,
    },
    toLeft: {
      paddingLeft: 20,
      alignItems: "flex-end",
      alignSelf: "flex-start"
    },
    faleConosco: {
      backgroundColor: "black",
      alignItems: "stretch",
      paddingTop: 25,
      paddingBottom: 20
    },
    linhaDuvidas: {
      flexDirection: "row",
    },
    duvidas: {
      flexDirection: "row",
      backgroundColor: "#e20f17",
      color: "white",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: 10,
      borderBottomRightRadius: 15,
      borderTopRightRadius: 15,
      flexGrow: 4
    },
    faleComAtendentes: {
      flexGrow: 8,
      fontSize:14
    },
    email: {
      borderWidth: 0,
      borderTopWidth: 1,
      borderColor: "#feca03",
      paddingTop: 2,
      marginTop: 10,
      width: '70%',
      alignSelf: 'flex-end',
      borderStyle: 'solid',
      justifyContent: 'flex-start'
    }
  }
}
class RodapeCompleto extends Component {

  render() {
    return <React.Fragment>
      <LojaConsumer>
      {({ atualizaDadosLoja, dadosLoja }) => (
      <DadosRodape
          atualizaDadosLoja = {atualizaDadosLoja}
          dadosLoja = {dadosLoja}
      />
      )}
      </LojaConsumer>
      <MiniRodape/>
    </React.Fragment>
  }

}

export default RodapeCompleto;