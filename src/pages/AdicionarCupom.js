import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import RodapeCompleto from '../components/RodapeCompleto';
import { FaCamera, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import QrReader from 'react-qr-reader'
import Alert from '../ui/Alert';

export default class AdicionarCupom extends React.Component {

  state = {
    status: 'display',
    cupom: null,
    loadingCupom: false,
    redirectTo: null,
    alertMessage: null
  }

  handleScan = cupomValue => {
    if (cupomValue) {
      this.setState({
        cupom: cupomValue,
        status: 'display'
      })
      this.findCupom(cupomValue)
    }
  }

  handleChangeCumpom = (e) => {
    const cupomValue = e.target.value
    this.findCupom(cupomValue)
  }

  findCupom = (cupomValue) => {
    if(cupomValue && cupomValue.length > 3) {
      if(!this.state.loadingCupom) {
        this.setState({ loadingCupom: true })
        setTimeout(
        ()=>{
          console.log(cupomValue)
          this.setState({
            alertMessage: 'Infelizmente este cupom não foi encontrado, verifique o código ou utilize um novo cupom.',
            loadingCupom: false
          })
        },
        1000)
      }
    }
  }

  handleError = err => {
    console.error(err)
  }

  changeStatus = (status) => {
    this.setState({
      status
    })
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>
      {this.state.status === 'read' && (
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

      <Breadcrumb>
        <Link to="/areacliente"><RubikText style={{color: '#585756'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
        <Link to="/meuscupons">
          <RubikText style={{color: '#585756'}}>Meus Cupons &gt;&nbsp;</RubikText>
        </Link>
        <RubikText bold={true} style={{color: '#585756'}}>Novo</RubikText>
      </Breadcrumb>

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
            }}
          >
            Ler o QR Code impresso na etiqueta
          </RubikText>
          <RubikText style={{paddingLeft: 20, textAlign: 'left'}}>
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

      <View style={{ backgroundColor: 'black', padding: 20, marginBottom: 30, marginTop: 40, flexDirection: 'row'}}>
        <RubikText style={{color: 'white', textAlign: 'left'}}>
          Clique no botão abaixo e <span style={{color:'#feca03', display: 'inline', fontWeight: 'bold'}}>aponte a câmera do seu celular para o QR Code</span>.
          Aguarde alguns instantes até que ele seja escaneado.
        </RubikText>
        <img
          alt="Leitor QR Code"
          src={require('../assets/maoqr.png')}
          style={{marginTop: -69, marginBottom: -57, width: 160}}
        />
      </View>

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
        onClick={() => this.changeStatus('read')}
      >
        <FaCamera style={{paddingRight: 5}}/>
        <RubikText style={{fontSize: 20}}>
          LER QR CODE
        </RubikText>
      </button>

      <RubikText
        bold={true} 
        style={{
          backgroundColor: '#55bcba',
          padding: 10,
          marginBottom: 10,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          paddingLeft: 20,
          paddingRight: 20,
          alignSelf: 'flex-start'
        }}
      >
        Insira seu código no campo abaixo
      </RubikText>
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
          marginTop: 10,
          marginBottom: 30,
          textAlign: 'center'
        }}
        value={this.state.cupom}
        onChange={this.handleChangeCumpom}
      />
      { this.state.loadingCupom && (
          <View style={{ alignItems: 'center', alignSelf: 'stretch', paddingBottom: 10}}>
            <FaSpinner color="black" className="spin" style={{fontSize: 36}} />
          </View>
      )}
      { this.state.alertMessage && (
        <Alert
          title = "Adicionando Cupom"
          message = {this.state.alertMessage}
          btnText = "OK"
          onClickButton = {this.dismissAlertErro}
          dismissAlert = {this.dismissAlertErro}
        />
      )}

      <RodapeCompleto/>
    </View>
    )
  }

  dismissAlertErro = () => {
    this.setState({
      alertMessage: false
    })
  }
}