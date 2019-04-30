
import React from 'react';
import View from '../ui/View';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import RodapeCompleto from '../components/RodapeCompleto';

export default class CupomDetalhe extends React.Component {

  render() {
    return ( <View>
      <Header/>

      <View>
        <Breadcrumb>
            <RubikText style={{color: '#585756'}}>Meus cupons &gt;&nbsp;</RubikText>
            <RubikText bold={true} style={{color: '#585756'}}>Detalhes do cupom</RubikText>
        </Breadcrumb>

        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 20}}>
          <View>
              <RubikText 
                bold={true}
                style={{
                    fontSize: 24,
                    padding: 3,
                    paddingRight: 10,
                    paddingLeft: 10,
                    color: '#1d1e1b'
                }}
              >
                  CALÇA JEANS MARCA XABLAU
              </RubikText>
              <RubikText 
                style={{
                borderTop: 1,
                borderColor: 'black',
                borderStyle: 'solid',
                justifyContent: 'center',
                paddingTop: 5
              }}>
                subtitulo
              </RubikText>
          </View>
        </View>

        <img
            src="http://www.sjequipaobra.com.br/fotos/vestylle.jpg"
            alt="Titulo"
            style={{
                borderTop: 1,
                borderBottom: 1,
                borderStyle: 'solid',
                borderColor: '#585756',
                objectFit: 'cover'
            }}
        />

        <View style={{padding: 15, marginRight: 20, marginLeft: 20, textAlign: 'left'}}>
            <RubikText style={{fontSize: 18, marginBottom: 5}}>
                Esse cupom é valido para todas calças jenas da marca Xablau.
            </RubikText>
            <RubikText>
                Esse cupom é válido até 05/12/2019
            </RubikText>
        </View>
      </View>

        <RubikText
            bold={true} 
            style={{
            backgroundColor: '#e20f17',
            padding: 10,
            paddingRight: 20,
            marginTop: 20,
            marginBottom: -2,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 10,
            paddingLeft: 35,
            color: 'white',
            alignSelf: 'flex-start'
            }}
        >
            COMO UTILIZO O MEU CUPOM?
        </RubikText>

        <View style={{flexDirection: 'row', alignSelf: 'stretch', backgroundColor: 'black'}}>
            <View>
                <RubikText style={{ color: 'white',padding: 20, textAlign: 'left'}}>
                    Para utilizar seu cupom basta <b style={{display: 'inline',color: "#feca03"}}>ativar e mostrar a tela do seu celular</b> para a pessoa que te atender na loja Vestylle Megastore Jaú
                </RubikText>
            </View>
            <img
            src={require('../assets/maobar.png')}
            alt="Escanear Cupom"
            className="sm-hide"
            style={{
                marginTop: -12,
                marginBottom: -12,
                zIndex: 2,
                alignSelf:'center',
                width: '500px'
            }}
            />
        </View>

        <View style={{ 
            backgroundColor: '#feca03', 
            alignSelf: 'stretch',
            padding: 20
        }}>
            <RubikText 
                bold={true}
                style={{ 
                    backgroundColor: 'white', 
                    color: 'black',
                    alignSelf: 'center',
                    margin:30,
                    padding: 20,
                    paddingRight: 30,
                    paddingLeft: 30,
                    fontSize: 24
                }}
            >
                #00102033
            </RubikText>
        </View>

      <RodapeCompleto/>
    </View>
    )
  }
}