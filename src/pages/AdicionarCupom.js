import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import RodapeCompleto from '../components/RodapeCompleto';
import { FaCamera } from 'react-icons/fa';

export default class AdicionarCupom extends React.Component {

  state = {
  }

  componentDidMount() {

  }

  render() {
    return ( <View>
      <Header/>

      <Breadcrumb>
        <Link to="/areacliente"><RubikText style={{color: '#585756'}}>Área do Cliente &gt;&nbsp;</RubikText></Link>
        <Link to="/adicionarcupom">
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
      >
      </input>

      <RodapeCompleto/>
    </View>
    )
  }
}