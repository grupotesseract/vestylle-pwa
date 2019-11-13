import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import { Link, Redirect } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import RodapeCompleto from '../components/RodapeCompleto';
import { FaCamera, FaArrowLeft, FaSpinner, FaSearch } from 'react-icons/fa';
import QrReader from 'react-qr-reader'
import Alert from '../ui/Alert';
import { UserConsumer } from '../UserContext';
import ReactGA from 'react-ga';

class InputCupomQR extends React.Component {

  state = {
    alertMessage: null,
    cupom: '',
    status: 'display',
    loadingCupom: false,
    redirectTo: null,
    ativaBuscaCupom: null
  }

  handleScan = cupomValue => {
    if (cupomValue) {
      cupomValue = this.removeURI(cupomValue)
      this.setState({
        cupom: cupomValue,
        status: 'display',
      })
      this.findCupom(cupomValue)
    }
  }

  changeStatus = (status) => {
    this.setState({
      status
    })
  }

  componentDidMount() {
    ReactGA.pageview('/adicionarcupom');
  }

  componentDidUpdate() {
    const codigoCupom = this.props.codigoCupom
    if(codigoCupom && !this.state.cupom)
    if(codigoCupom){
      this.setState({ cupom: codigoCupom })
      this.findCupom(codigoCupom)
    }
  }

  handleChangeCumpom = (e) => {
    let cupomValue = this.removeURI(e.target.value)
    this.setState({cupom: cupomValue})
  }

  onPressIR = () => {
    const { cupom } = this.state;
    console.log("CUPOM", cupom)
    this.findCupom(cupom);
  }

  removeURI(cupomValue) {
    const valoresQR = cupomValue && cupomValue.split('/')
    if(valoresQR.length > 1){
      return valoresQR[valoresQR.length-1]
    }
    return cupomValue
  }

  findCupom = async (cupomValue) => {
    const { loadingCupom } = this.state;
    if(cupomValue && cupomValue.length > 3) {
      if(!loadingCupom) {
        this.setState({ loadingCupom: true })
        console.log(cupomValue)

        this.props.buscaCupom(cupomValue)
        .then(cupom => {
          console.log(cupom)
          if(cupom && cupom.id) {
            this.setState({
              loadingCupom: false,
              cupom: '',
              redirectTo: 'cupom/'+cupom.id
            })
          }
        })
        .catch((e) => {
          this.setState({
            alertMessage: e,
            loadingCupom: false
          })
        })
      }
    }
  }

  handleError = err => {
    console.error(err) 
    this.setState({
        status: 'display'
      })
  }

  render() {
    const { 
      redirectTo, 
      status, 
      loadingCupom,
      alertMessage,
    } = this.state;
    return <View className="margin-md-top">

      { redirectTo && (
        <Redirect to={redirectTo}/>
      )}

      {status === 'read' && (
        <div className="qr-reader">
          <QrReader
            delay={100}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <button 
            onClick={() => this.changeStatus('display')}
          >
            <FaArrowLeft
              size={36}
              color='white'
              />
          </button>
        </div>
      )}

      <button
        style={{
          backgroundColor: '#feca03',
          padding: 10,
          alignSelf:'center',
          borderRadius: 5,
          paddingRight: 20,
          paddingLeft: 20,
          boxShadow: '0 0 5px gray',
          marginBottom: 30,
        }}
        className="hide-md"
        onClick={() => this.changeStatus('read')}
      >
        <FaCamera style={{paddingRight: 5}}/>
        <RubikText style={{fontSize: 20}}>
          LER QR CODE
        </RubikText>
      </button>

      <RubikText
        bold={true} 
        className="titulo-verde"
      >
        Insira seu código no campo abaixo
      </RubikText>

      <View style={{ 
        display: 'flex', 
        flexDirection: "row", 
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
        }}>
        <input
          type="text"
          style={{
            border: 2,
            borderStyle: 'solid',
            borderRadius: 7,
            borderColor: '#bdbabc',
            backgroundColor: '#ebeaeb',
            alignSelf: 'center',
            padding: 10,
            fontSize: 20,
            textAlign: 'center'
          }}
          value={this.state.cupom}
          onChange={(e) => this.handleChangeCumpom(e)}
        />
        <button
          style={{
            backgroundColor: '#feca03',
            padding: 12,
            alignSelf:'center',
            borderWidth: 2,
            borderStyle: 'solid',
            marginLeft: 5,
            borderRadius: 7,
            borderColor: '#eeba13',
          }}
          onClick={() => this.onPressIR()}
        >
          { loadingCupom ? (
            <FaSpinner color="black" className="spin" style={{fontSize: 20}} />
          ):(
            <FaSearch color="black" style={{fontSize: 20}} />
          )}
        </button>
      </View>
      { alertMessage && (
        <Alert
          title = "Adicionando Cupom"
          message = {alertMessage}
          btnText = "OK"
          onClickButton = {this.dismissAlertErro}
          dismissAlert = {this.dismissAlertErro}
        />
      )}
    </View>
  }

  dismissAlertErro = () => {
    this.setState({
      alertMessage: false
    })
  }
}

export default class AdicionarCupom extends React.Component {

  state = {
    codigoCupom: null
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const codigoCupom = params.codigoCupom
    this.setState({
      codigoCupom
    })
  }

  render() {
    return ( <View>
      <Header/>

      <View className="container">

      <Breadcrumb>
        <Link to="/areacliente"><RubikText style={{color: '#585756'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
        <Link to="/meuscupons">
          <RubikText style={{color: '#585756'}}>Meus Cupons &gt;&nbsp;</RubikText>
        </Link>
        <RubikText bold={true} style={{color: '#585756'}}>Novo</RubikText>
      </Breadcrumb>

      <View className="hide-md">
      <View style={{flexDirection: 'row'}}>
        <View style={{ display: 'flex', marginTop: 20, marginBottom: 10}}>
          <RubikText
            bold={true} 
            style={{
              backgroundColor: '#55bcba',
              padding: 10,
              marginBottom: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              paddingLeft: 20,
              textAlign:'left'
            }}
          >
            Ler o QR Code impresso na etiqueta
          </RubikText>
          <RubikText style={{paddingLeft: 20, textAlign: 'left', fontSize: 14, paddingRight: 20}}>
            Utilize a câmera do seu celular para ler o QRCode impresso na etiqueta do produto com desconto.
          </RubikText>
        </View>
        <View style={{ display: 'flex', marginTop: 20 }}>
          <img
            alt="Etiqueta com QR Code"
            className="sm-hide"
            src={require('../assets/qrtag.png')}
            style={{marginTop: -10, marginLeft: -20}}
          />
        </View>
      </View>

      <View style={{ backgroundColor: 'black', paddingLeft: 20, marginBottom: 30, marginTop: 40, flexDirection: 'row'}}>
        <RubikText style={{fontSize: 12,color: 'white', textAlign: 'left', paddingBottom: 34, paddingTop: 20}}>
          Clique no botão abaixo e <span style={{color:'#feca03', display: 'inline', fontWeight: 'bold'}}>aponte a câmera do seu celular para o QR Code</span>.
          Aguarde alguns instantes até que ele seja escaneado.
        </RubikText>
        <img
          alt="Leitor QR Code"
          src={require('../assets/maoqr.png')}
          style={{marginTop: -69, marginBottom: -57, width: 135 }}
        />
      </View>
      </View>


      <UserConsumer>
        {({buscaCupom}) => (
          <InputCupomQR
            buscaCupom={buscaCupom}
            codigoCupom={this.state.codigoCupom}
          />
        )}
      </UserConsumer>

      </View>
      <RodapeCompleto/>
    </View>
    )
  }
}