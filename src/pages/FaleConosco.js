import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import TouchableHighlight from '../ui/TouchableHighlight';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Redirect } from 'react-router-dom'
import ButtonBorder from '../ui/ButtonBorder';
import { LojaConsumer } from '../LojaContext';
import Alert from '../ui/Alert';
import { UserConsumer } from '../UserContext';

class FormContato extends React.Component {
  state = {
    nome: '',
    contato: '',
    assunto: '',
    mensagem: '',
    loading: false,
    erroForm: null,
    mensagemEnviada: false
  }

  render() {
    return (
      <View>

      { this.state.redirectTo && (
        <Redirect to={this.state.redirectTo}/>
      )}
      <input 
        style={this.style.inputRound} 
        value={this.state.nome}
        onChange={(e) => this.setState({nome: e.target.value})}
        placeholder="Nome"
        />
      <input 
        style={this.style.inputRound} 
        value={this.state.contato}
        onChange={(e) => this.setState({contato: e.target.value})}
        placeholder="Email ou telefone para contato"
        />
      <input 
        style={this.style.inputRound} 
        value={this.state.assunto}
        onChange={(e) => this.setState({assunto: e.target.value})}
        placeholder="Assunto"
        />
      <textarea
        style={Object.assign({}, this.style.inputRound, {marginTop: 12, marginBottom: 30})} 
        value={this.state.mensagem}
        onChange={(e) => this.setState({mensagem: e.target.value})}
        placeholder="Escreva sua mensagem aqui."
        />
      <ButtonBorder
        title="ENVIAR"
        loading={this.state.loading}
        onPress={() => this.sendData()}
        style={{
          marginBottom: 41,
          backgroundColor: '#1d1e1b',
          color: 'white',
          padding: 12,
          borderRadius: 8,
          paddingRight: 50,
          paddingLeft: 50
        }}
      />

      { this.state.erroForm && (
        <Alert
          title = "Atenção"
          message = {this.state.erroForm}
          btnText = "voltar"
          onClickButton = {() => this.dismissAlert()}
          dismissAlert = {() => this.dismissAlert()}
        />
      )}
      { this.state.mensagemEnviada && (
        <Alert
          title = "Obrigado!"
          message = "Agradecemos por entrar em contato!"
          btnText = "tela inicial"
          onClickButton = {() => this.redirectToHome()}
          dismissAlert = {() => this.redirectToHome()}
        />
      )}
      </View>
    )
  }

  redirectToHome() {
    this.setState({
      mensagemEnviada: null,
      redirectTo: '/'
    })
  }

  dismissAlert() {
    this.setState({
      erroForm: null
    })
  }

  async sendData() {
    this.setState({
      loading: true
    })
    await this.props.faleConosco(
      1,
      this.state.nome,
      this.state.contato,
      this.state.assunto,
      this.state.mensagem
    )
    .then((res) => {
      if(res.success) {
        console.log(res)
        this.setState({mensagemEnviada: true})
      } else {
        console.log(res)
        this.setState({erroForm: res.message})
      }

    })
    .catch((e) => {
      console.log("deu ruim", e)
    })
  }

  style={
    inputRound: {
      fontFamily: 'Rubik',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 12,
      margin: 3,
      marginRight: 20,
      marginLeft: 20,
      fontSize: 20
    }
  }
}

class FaleConoscoInfosLoja extends React.Component {

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }

  render() {
    const dadosLoja = this.props.dadosLoja
    if(!dadosLoja) {
      return <> </>
    }
    console.log("Dados da loja", this.props.dadosLoja)
    return <>
      <View style={{flexDirection:'column', justifyContent: 'space-evenly'}}>
        {dadosLoja.whatsapp &&
        <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp))}>
          <RubikText style={{ color: "black", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
          <FaWhatsapp
            size={14}
          />{dadosLoja.whatsapp}
          </RubikText>
        </TouchableHighlight>
        }
        {dadosLoja.whatsapp2 &&
        <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp2))}>
          <RubikText style={{ color: "black", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
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
        <RubikText style={{color: "black", paddingTop: 20, paddingLeft: 20 }}>
          Ou se preferir, entre em contato
        </RubikText>
        <RubikText style={{color: "black", paddingLeft: 20}}>
          com a loja pelo telefone
        </RubikText>
      </View>
      <a href={"tel:"+this.onlyNumbers(dadosLoja.telefone)}>
        <RubikText style={{ color: "black", marginTop: 5}}>
          <FaPhone
          size={14}
        />{dadosLoja.telefone}
        </RubikText>
      </a>
      </>
    }
    { dadosLoja.email &&
      <a href={"mailto:"+dadosLoja.email} style={{alignSelf: 'flex-start'}}>
      <RubikText style={{ color: "black", marginTop:5, padding: 5, paddingLeft: 20}}>
        <MdEmail
        size={14}
      /> {dadosLoja.email}
      </RubikText>
      </a>
    }
    </>
  }
}

export default class FaleConosco extends React.Component {

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <RubikText bold={true} style={{color: 'black'}}>Fale conosco</RubikText>
      </Breadcrumb>

      <RubikText 
      bold={true} 
      style={{
        borderBottomWidth: 2, 
        alignSelf: 'flex-start', 
        paddingLeft: 20,
        marginTop: 30
      }}
      >
        FALE COM UM DE NOSSOS ATENDENTES
      </RubikText>
      <View style={{flexDirection: "row", paddingTop:10}}>
        <RubikText style={{color: "black", paddingLeft: 20}}>
          Iniciar conversa pelo 
        </RubikText>
        <TouchableHighlight onPress={this.openWhatsapp} style={{flexGrow: 1, justifyContent:"flex-start"}}>
          <RubikText style={{ color: "black", textDecorationLine: 'underline' }}>&nbsp;Whatsapp</RubikText>
        </TouchableHighlight>
      </View>
      <LojaConsumer>
        {({dadosLoja}) => (
        <FaleConoscoInfosLoja
          dadosLoja={dadosLoja}
        />
        )}
      </LojaConsumer>

      <RubikText 
      bold={true} 
      style={{
        borderBottomWidth: 2, 
        alignSelf: 'flex-start', 
        paddingLeft: 20,
        marginTop: 30,
        marginBottom: 20
      }}
      >
        OU ENTRE EM CONTATO PELO FORMULÁRIO
      </RubikText>

      <UserConsumer>
        {({faleConosco}) => (
        <FormContato
          faleConosco={faleConosco}
        />
        )}
      </UserConsumer>
      <RodapeCompleto/>
    </View>
    )
  }
}