import React, { Component } from 'react';
import RubikText from '../ui/RubikText';
import MiniRodape from './MiniRodape'
import View from '../ui/View';
import { FaClock, FaWhatsapp, FaPhone } from 'react-icons/fa';
import TouchableHighlight from '../ui/TouchableHighlight';
import { MdEmail } from 'react-icons/md';
import { LojaConsumer } from '../LojaContext';
import { Link } from 'react-router-dom'

class DadosRodapeWide extends Component {

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  render() {
    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <></>
    }
    return <View style={{borderTop: '1px solid black', padding: 20, fontSize: 12}}>
      <View className="container" style={{flexDirection: 'row'}}>
        <img
          alt="Vestylle"
          src={require('../assets/logofull.png')}
           style={{ marginRight: 40, width:'70%', alignSelf: 'center', maxWidth: 230 }}
        />
        <View style={{ borderLeft: '2px solid black', fontSize: 12, minWidth: 150, paddingLeft: 10, lineHeight: 1.7, alignItems: 'flex-start'}}>
            <Link to="/">INÍCIO</Link>
            <Link to="/areacliente">ÁREA DO CLIENTE</Link>
            <Link to="/meuspontos">MEUS PONTOS</Link>
            <Link to="/meuscupons">MEUS CUPONS</Link>
            <Link to="/adicionarcupom">ADICIONAR CUPOM</Link>
            <Link to="/listadesejos">LISTA DE DESEJOS</Link> 
            <Link to="/produtos">PRODUTOS</Link>
            <Link to="/loja">LOJA</Link>
            <Link to="/faleconosco">FALE CONOSCO</Link>
        </View>
        <View style={{lineHeight: 1.5, borderLeft: '2px solid black', alignItems: 'flex-start', justifyContent: 'space-between', minWidth: 200, paddingLeft: 10}}>
          <View>
            <RubikText bold={true} style={{fontSize: 14}}>Horário de</RubikText>
            <RubikText bold={true} style={{fontSize: 14}}>funcionamento</RubikText>
            <RubikText>Segunda a Sexta 9h as 18h</RubikText>
            <RubikText>Sábados 9h as 17h</RubikText>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <RubikText bold={true} style={{fontSize: 14}}>Endereço</RubikText>
            <RubikText style={{maxWidth: 180, textAlign: 'left'}}>
              {dadosLoja.endereco}
            </RubikText>
            <a href="http://maps.apple.com/?ll=-22.2955408,-48.5574577,17">
              <RubikText bold={true} style={{fontSize: 14, textDecorationLine: 'underline'}}>VER NO MAPA</RubikText>
            </a>
          </View>
        </View>
        <View style={{
          borderLeft: '2px solid black',
          alignItems: 'flex-start'
        }}>
          <View style={this.style.duvidas}>
            <RubikText bold={true} style={{color: "white", alignItems: "center"}}>
              DÚVIDAS ?
            </RubikText>
          </View>
          <View style={{padding: 10, alignItems: 'flex-start'}}>
            <RubikText bold={true}>FALE CONOSCO</RubikText>
            {dadosLoja.whatsapp &&
            <>
              <RubikText style={{marginTop: 6}}>
                Iniciar conversa pelo 
              </RubikText>
              <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp))}>
                <RubikText bold={true}>Whatsapp</RubikText>
                <RubikText>&nbsp; {dadosLoja.whatsapp}</RubikText>
              </TouchableHighlight>
            </>
            }
            {dadosLoja.whatsapp2 &&
            <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp2))}>
              <RubikText>
              {dadosLoja.whatsapp2}
              </RubikText>
            </TouchableHighlight>
            }

            { dadosLoja.telefone &&
            <>
              <RubikText style={{marginTop: 6}}>
                Ou se preferir, você pode entrar em
              </RubikText>
              <RubikText>
                contato com a loja pelo telefone
              </RubikText>
            <a href={"tel:"+this.onlyNumbers(dadosLoja.telefone)}>
              <RubikText>
                <FaPhone
                size={10}
                style={this.style.icon}
              />{dadosLoja.telefone}
              </RubikText>
            </a>
            </>
            }
          </View>
        </View>
      </View>
    </View>
  }

  style = {
    duvidas: {
      flexDirection: "row",
      backgroundColor: "#e20f17",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: '5px 10px',
      borderBottomRightRadius: 15,
      borderTopRightRadius: 15,
    },
  }
}

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
            <RubikText bold={true} style={{color: "#feca03"}}>FALE CONOSCO</RubikText>
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
            />{dadosLoja.whatsapp2}
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
      fontSize:14,
      justifyContent: 'center',
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

 state = {
    windowSize: {
      sm: true,
      md: false,
      lg: false
    },
  }

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowSize: {
        sm: true,
        md: window.innerWidth > 1023,
        lg: window.innerWidth > 1366
      }
    })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return <React.Fragment>
      <LojaConsumer>
      {({ atualizaDadosLoja, dadosLoja }) => 
        this.state.windowSize.md ?
        <DadosRodapeWide
            atualizaDadosLoja = {atualizaDadosLoja}
            dadosLoja = {dadosLoja}
        />
        :
        <DadosRodape
            atualizaDadosLoja = {atualizaDadosLoja}
            dadosLoja = {dadosLoja}
        />
      }
      </LojaConsumer>
      <MiniRodape/>
    </React.Fragment>
  }

}

export default RodapeCompleto;