import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import RubikText from '../ui/RubikText';
import Header from '../components/Header'
import ImageBackground from '../ui/ImageBackground';
import ButtonBorder from '../ui/ButtonBorder';
import MiniRodape from '../components/MiniRodape'
import { Redirect } from 'react-router-dom'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import TouchableHighlight from '../ui/TouchableHighlight';
import Alert from '../ui/Alert';
import MaskedInput from 'react-text-mask'
import { FaSpinner } from 'react-icons/fa';

class Checkbox extends React.Component {
  render() { 
    return <TouchableHighlight
      onPress={this.toggleCheckbox}
      style={this.props.style}
      >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {this.props.value ? (
      <MdCheckBox
        size={26}
        style={{color:'white'}}
      />
      ):(
      <MdCheckBoxOutlineBlank
        size={26}
        style={{color:'white'}}
      />
      )}
      <RubikText style={{color: 'white', paddingLeft: 5}}>{this.props.title}</RubikText>
    </View>
    </TouchableHighlight>
  }

  toggleCheckbox = () => {
    const newValue = !this.props.value;
    this.props.onChange(newValue);
  }
}

class InputValidacao extends React.Component {

  render() {
    return (
      <View>
        <RubikText bold={true} style={{color: '#feca03', fontSize:12, marginTop: 3}}>{this.props.title}</RubikText>
        { this.props.mask ? (
          <MaskedInput
            style={this.style.inputSublinhado} 
            value={this.props.value}
            onChange={this.props.onChange}
            mask={this.props.mask}
          />
        ):(
          <input 
            style={this.style.inputSublinhado} 
            value={this.props.value}
            onChange={this.props.onChange}
            />
        )}
      </View>
    )
  }  

  style = {
    inputSublinhado: {
      borderWidth: 0,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      color: 'white',
      borderColor: '#585756',
      marginTop: 5,
      marginBottom: 8,
      paddingBottom: 2,
      fontSize: 15
    }
  }
}

class FormMeuPerfil extends React.Component {

  state = {
    nome: '',
    email: '',
    cpf: '',
    data_nascimento: '',
    celular: '',
    genero: '',
    receberNovidades: false,
    loading: true
  }

  loadPerfil() {
    if(this.state.loading) {
      this.props.getData()
      .then(perfil => {
        if(perfil.data_nascimento) {
          perfil.data_nascimento = this.utf2ddmmaaaa(perfil.data_nascimento)
        }
        this.setState({
          ...perfil,
          loading: false
        })
      })
      .catch(erro => console.error('Erro no form de meu perfil',erro))
    }
  }

  componentDidUpdate() {
    this.loadPerfil();
  }

  componentDidMount() {
    this.loadPerfil();
  }

  render() {
    return <form onSubmit={(e) => this.atualizarPerfil(e)}>
      <RubikText bold={true} style={{color:'white', fontSize: 14, marginTop: 10, marginBottom: 10}} >
        Meu perfil
        {this.state.loading && <FaSpinner color="white" className="spin" style={{fontSize: 18,marginLeft: 20}}/>}
      </RubikText>

      { this.state.redirectTo && (
        <Redirect to={this.state.redirectTo}/>
      )}
      <InputValidacao 
        title="Nome" 
        value={this.state.nome}
        onChange={(nome) => this.setState({nome : nome.target.value}) }/>
      <InputValidacao 
        title="E-mail" 
        value={this.state.email}
        onChange={(email) => this.setState({email : email.target.value})}/>


      <View>
        <RubikText bold={true} style={{color: '#feca03', fontSize:12, marginTop: 3}}>Gênero</RubikText>
        <select
          onChange={(e) => this.setState({genero: e.target.value})}
          style= {{
            backgroundColor: 'transparent',
            padding: 0,
            color: 'white',
            fontFamily: 'Rubik',
            marginBottom: 5,
            borderWidth: 0,
            borderStyle: 'solid',
            borderBottomWidth: 1,
            borderColor: '#585756',
            marginTop: 5,
            fontSize: 15
          }}
        >
          <option style={{backgroundColor:'#33302b'}} value="Prefiro Não Informar" selected={"Prefiro Não Informar"===this.state.genero}>Prefiro Não Informar</option>
          <option style={{backgroundColor:'#33302b'}} value="Feminino" selected={"Feminino"===this.state.genero}>Feminino</option>
          <option style={{backgroundColor:'#33302b'}} value="Masculino" selected={"Masculino"===this.state.genero}>Masculino</option>
        </select>
      </View>
      <InputValidacao 
        mask={[/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        title="CPF" 
        value={this.state.cpf}
        onChange={(cpf) => this.setState({cpf: cpf.target.value})}/>
      <InputValidacao 
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        title="Data de Nascimento" 
        value={this.state.data_nascimento}
        onChange={(data_nascimento) => this.setState({data_nascimento: data_nascimento.target.value})}/>
      <InputValidacao 
        mask={['(',/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        title="Celular"
        value={this.state.celular}
        onChange={(celular) => this.setState({celular: celular.target.value})}/>

      <Checkbox
        title="Quero receber novidades e ofertas da Vestylle Megastore Jaú"
        value={this.state.receberNovidades}
        onChange={(receberNovidades) => this.setState({receberNovidades})}
        style={{paddingTop: 20, paddingBottom: 15}}/>
      
      <ButtonBorder
        title="CONTINUAR"
        submit={true}
        loading={this.state.loading}
        style={{marginBottom: 41}}
      />

      { this.state.erroUpdate && (
        <Alert
          title = "Atenção"
          message = {this.state.msgErro}
          btnText = "OK"
          onClickButton = {this.dismissAlertErro}
          dismissAlert = {this.dismissAlertErro}
        />
      )}
    </form>
  }

  dismissAlertErro = () => {
    this.setState({
      erroUpdate: false
    })
  }

  async atualizarPerfil(event) {
    if(event) {
      event.preventDefault()
    }
    this.setState({loading: true})
    let perfil = {
      nome: this.state.nome,
      email: this.state.email,
      cpf: this.state.cpf,
      genero: this.state.genero,
      data_nascimento: this.state.data_nascimento,
      celular: this.state.celular,
      receberNovidades: this.state.receberNovidades
    }
    
    // Trata data de nascimento e cpf
    if(perfil.data_nascimento) {
      perfil.data_nascimento = this.ddmmaaaa2utf(perfil.data_nascimento)
    }
    if(perfil.cpf) {
      perfil.cpf = perfil.cpf.replace(/\D/g,'')
    }

    await this.props.setData(perfil)
    .then((res) => {
      if(res && res.succes && res.data) {
        const meuPerfil = res.data
        this.props.atualizaPerfil(meuPerfil)
      }
      this.props.getData()
      this.setState({loading: false})
      this.setState({redirectTo: '/areacliente'})
    })
    .catch((e) => {
      let msgErro = ""
      Object.keys(e).map((campo) => {
        msgErro += " "+e[campo]
        return msgErro
      })
      this.setState({
        loading: false,
        erroUpdate:true,
        msgErro
      })
    })
  }

  ddmmaaaa2utf = (stringDate) => {
    const splittedDate = stringDate.split('/');
    const day = splittedDate[0]
    const month = splittedDate[1]
    const year = splittedDate[2]
    return year+'-'+month+'-'+day;
  }
  utf2ddmmaaaa = (utfDate) => {
    const date = utfDate.split(' ')[0];
    const splittedDate = date.split('-');
    const day = splittedDate[2]
    const month = splittedDate[1]
    const year = splittedDate[0]
    return day+'/'+month+'/'+year;
  }
}

export default class MeuPerfil extends React.Component {

  state = {
    erroAtualizaPerfil: false,
    msgErro: '',
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>
      <UserConsumer>
      {({ getDadosMeuPerfil, setDadosMeuPerfil, setPerfil }) => (<>
      <ImageBackground
        source={require('../assets/fundologin.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{padding: 20}}>
          <FormMeuPerfil
            getData={getDadosMeuPerfil}
            setData={setDadosMeuPerfil}
            atualizaPerfil={setPerfil}
          />
        </View>
        <MiniRodape/>
      </ImageBackground>
            
      </>
      )}
      </UserConsumer>
    </View>
    )
  }
}