import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import Breadcrumb from '../ui/Breadcrumb';
import TouchableHighlight from '../ui/TouchableHighlight';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import ButtonBorder from '../ui/ButtonBorder';

class FormContato extends React.Component {
  state = {
    nome: '',
    contato: '',
    assunto: '',
    mensagem: '',
    loading: false
  }

  render() {
    return (
      <View>

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
        submit={true}
        loading={this.state.loading}
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
      </View>
    )
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

export default class FaleConosco extends React.Component {

  state = {
  }

  componentDidMount() {

  }

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
      <View style={{flexDirection:'column', justifyContent: 'space-evenly'}}>
        <TouchableHighlight onPress={() => window.open("http://api.whatsapp.com/send?phone=551421043500")}>
          <RubikText style={{ color: "black", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
          <FaWhatsapp
            size={14}
          />(14) 99766-8707
          </RubikText>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.openWhatsapp}>
          <RubikText style={{ color: "black", textDecorationLine: 'underline',  flexGrow: 0, marginTop: 5 }}>
          <FaWhatsapp
            size={14}
          />(14) 2104-3500
          </RubikText>
        </TouchableHighlight>
      </View>
      <View style = {{alignItems: 'flex-start', flexGrow: 1, alignSelf: 'stretch'}}>
        <RubikText style={{color: "black", paddingTop: 20, paddingLeft: 20 }}>
          Ou se preferir, entre em contato
        </RubikText>
        <RubikText style={{color: "black", paddingLeft: 20}}>
          com a loja pelo telefone
        </RubikText>
      </View>
      <a href="tel:1421043500">
        <RubikText style={{ color: "black", marginTop: 5}}>
          <FaPhone
          size={14}
        />(14) 2104-3500
        </RubikText>
      </a>
      <a href="mailto:megajau@vestylle.com.br" style={{alignSelf: 'flex-start'}}>
      <RubikText style={{ color: "black", marginTop:5, padding: 5, paddingLeft: 20}}>
        <MdEmail
        size={14}
      /> megajau@vestylle.com.br
      </RubikText>
      </a>

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

      <FormContato/>
      <RodapeCompleto/>
    </View>
    )
  }
}