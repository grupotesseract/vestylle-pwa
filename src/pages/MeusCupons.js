import React from 'react';
import View from '../ui/View';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import RodapeCompleto from '../components/RodapeCompleto';

class ListaCupons extends React.Component {
    state = {
        cupons: []
    }

    datetime2DDMMAAAA = (datetime) => {
        if(!datetime) return "";
        const date = datetime.split(" ")[0].split("-");
        const year = date[0]
        const month = date[1]
        const day = date[2]
        return day+"/"+month+"/"+year
    }

    static getDerivedStateFromProps(props, state) {
        if (props.cupons !== state.cupons) {
            return {
                cupons: props.cupons,
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    render() {
        return <>
        {this.state.cupons.map((cupom,key) => {
            return <View 
            key={key}
            style={{
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 0 5px black',
                margin: 20,
                alignSelf: 'stretch',
                alignItems: 'stretch',
                padding: 10
            }}>
            
                <View
                    style={{
                        margin: 20,
                        marginTop: 10,
                        border: 1,
                        borderColor: '#868686',
                        borderStyle: 'solid',
                        height: 250,
                        justifyItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    <img
                        src={cupom.oferta.urlFoto}
                        alt={cupom.titulo}
                        style={{
                            width:'100%',
                            position: 'absolute',

                        }}
                    />
                </View>
                <RubikText bold={true} style={this.style.bordaCentro}>
                    {cupom.titulo.toUpperCase()}
                </RubikText>
                <RubikText style={this.style.bordaCentro}>
                    {cupom.subtitulo}
                </RubikText>
                <RubikText style={{
                    marginRight: 30, 
                    marginLeft: 30, 
                    padding: 5, 
                    justifyContent: 'center'
                }}>
                    Válido até {this.datetime2DDMMAAAA(cupom.data_validade)}
                </RubikText>
                <Link
                    to={"/cupom/"+cupom.id}
                    title="VER DETALHES"
                    style={{
                        backgroundColor: '#e20f17',
                        color: 'white',
                        padding: 5,
                        marginTop: 10,
                        paddingRight: 30,
                        paddingLeft: 30,
                        borderRadius: 5,
                        alignSelf: 'center'
                    }}
                >
                    <RubikText>VER DETALHES</RubikText>
                </Link>
            </View>
        })}
        </>
    }

    style = {
        bordaCentro : {
            borderBottom: 1, 
            borderStyle: 'solid',
            borderColor: '#868686',
            alignItems: 'center', 
            textAlign: 'center',
            justifyContent: 'center',
            padding: 5,
            marginRight: 30,
            marginLeft: 30,
        }
    }
}

export default class MeusCupons extends React.Component {


  state = {
      cupons: 'ativos',
      cuponsAtivos: [
      {  
         "id":1,
         "oferta_id":2,
         "data_validade":"2026-10-03 00:00:00",
         "texto_cupom":"Cupom para promo\u00e7\u00e3o: c\u00f3digo 2",
         "created_at":"2019-04-17 20:19:28",
         "updated_at":"2019-04-17 20:19:28",
         "deleted_at":null,
         "foto_caminho":null,
         "cupom_primeiro_login":false,
         "titulo":"Cupom para testes",
         "subtitulo":"Cupom de teste",
         "oferta":{  
            "id":2,
            "descricao_oferta":"Oferta de Cal\u00e7as",
            "created_at":"2019-04-17 20:19:28",
            "updated_at":"2019-04-17 20:19:28",
            "deleted_at":null,
            "texto_oferta":"Cal\u00e7as em oferta s\u00f3 hoje",
            "titulo":"Cal\u00e7as",
            "subtitulo":"Oferta f\u00edcticia simulando pe\u00e7as do tipo Cal\u00e7as",
            "preco":"592,40",
            "urlFoto":"\/\/via.placeholder.com\/500x500",
            "foto":null
         }
      },
      {  
         "id":2,
         "oferta_id":1,
         "data_validade":"2028-09-12 00:00:00",
         "texto_cupom":"Cupom para promo\u00e7\u00e3o: c\u00f3digo 1",
         "created_at":"2019-04-17 20:19:28",
         "updated_at":"2019-04-17 20:19:28",
         "deleted_at":null,
         "foto_caminho":null,
         "cupom_primeiro_login":false,
         "titulo":"Cupom para testes",
         "subtitulo":"e-enable 24\/365 synergies",
         "oferta":{  
            "id":1,
            "descricao_oferta":"Oferta de Cal\u00e7as",
            "created_at":"2019-04-17 20:19:28",
            "updated_at":"2019-04-17 20:19:28",
            "deleted_at":null,
            "texto_oferta":"Cal\u00e7as da esta\u00e7\u00e3o em liquida\u00e7\u00e3o",
            "titulo":"Cal\u00e7as",
            "subtitulo":"Oferta f\u00edcticia simulando pe\u00e7as do tipo Cal\u00e7as",
            "preco":"364,50",
            "urlFoto":"\/\/via.placeholder.com\/500x500",
            "foto":null
         }
      }
        ],
    cuponsUtilizados: [
      {  
         "id":2,
         "oferta_id":1,
         "data_validade":"2028-09-12 00:00:00",
         "texto_cupom":"Cupom para promo\u00e7\u00e3o: c\u00f3digo 1",
         "created_at":"2019-04-17 20:19:28",
         "updated_at":"2019-04-17 20:19:28",
         "deleted_at":null,
         "foto_caminho":null,
         "cupom_primeiro_login":false,
         "titulo":"Cupom teste utilizado",
         "subtitulo":"Cupom já utilizado",
         "oferta":{  
            "urlFoto":"\/\/via.placeholder.com\/500x500",
         }
      }

    ]
 
  }

  render() {
    return ( <View>
      <Header/>

      <View style={{backgroundColor: "#585756", position: 'relative'}}>

        <Link 
            to="/adicionarcupom"
            style={{
                width:'15%', 
                backgroundColor:'#feca03', 
                borderTopLeftRadius: 5, 
                borderBottomLeftRadius: 5, 
                flexDirection: 'column', 
                padding: 10,
                position: 'fixed',
                right:0,
                top: '30%',
                zIndex:2,
                boxShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}>
            <img
                alt=""
                src={require('../assets/qrcode.png')}
                style={{ height: 36, width:36, flexGrow: 0 }}
            />
            <RubikText style={{fontSize: 10}}>Adicionar cupom</RubikText>
        </Link>

        <Breadcrumb>
            <Link to="/areacliente">
                <RubikText style={{color: 'white'}}>Área do cliente &gt;&nbsp;</RubikText>
            </Link>
            <RubikText bold={true} style={{color: 'white'}}>Meus cupons</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
            <View 
              style={{ flexDirection: 'row', marginTop: 15}}
              onClick={this.toggleCupom}
              >
                <RubikText
                    style={ 
                      Object.assign({}, 
                        this.style.toggleBtn, 
                        this.style.toggleLeftBtn, 
                        this.state.cupons === 'ativos' ? 
                            this.style.toggleAtivo :
                            this.style.toggleInativo) 
                    }
                >
                    DISPONÍVEIS
                </RubikText>
                <RubikText
                    style={ 
                      Object.assign({}, 
                        this.style.toggleBtn, 
                        this.style.toggleRightBtn, 
                        this.state.cupons === 'utilizados' ? 
                            this.style.toggleAtivo :
                            this.style.toggleInativo) 
                    }
                >
                    ATIVADOS
                </RubikText>
            </View>
            { this.state.cupons === 'ativos' ?
                <ListaCupons
                    cupons={this.state.cuponsAtivos}
                /> : 
                <ListaCupons
                    cupons={this.state.cuponsUtilizados}
                />  
            }

            <View style={{
                backgroundColor: "#feca03",
                margin: 30,
                padding: 30,
                flexDirection: 'row'
            }}>
                <img
                src={require('../assets/barscan.png')}
                alt="Escanear Cupom"
                className="sm-hide"
                style={{
                    marginLeft: 10,
                    marginRight: 30
                }}
                />
                <View style={{justifyContent: 'center'}}>
                    <RubikText bold={true}>
                        ADICIONAR CUPOM
                    </RubikText>
                    <RubikText style={{textAlign: 'left'}}>
                        Insira seu código promocional ou faça a leitura do QR Code e ganhe descontos especiais em suas compras
                    </RubikText>
                </View>
            </View>

        </View>
      </View>
        <RubikText
            bold={true} 
            style={{
            backgroundColor: '#55bcba',
            padding: 10,
            paddingRight: 20,
            marginTop: 20,
            marginBottom: -2,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 10,
            paddingLeft: 35,
            alignSelf: 'flex-start'
            }}
        >
            COMO UTILIZO O MEU CUPOM?
        </RubikText>
        <View style={{flexDirection: 'row', alignSelf: 'stretch', backgroundColor: 'black', marginBottom: 50}}>
            <View>
                <RubikText style={{ color: 'white',padding: 20, textAlign: 'left'}}>
                    Para utilizar seu cupom basta <b style={{display: 'inline',color: "#feca03"}}>ativar e mostrar a tela do seu celular</b> para um(a) atendente da loja Vestylle Megastore Jaú
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
      <RodapeCompleto/>
    </View>
    )
  }

  toggleCupom = () => {
    let cupons = this.state.cupons
    if(cupons === 'utilizados') {
        cupons = 'ativos'
        this.setState({cupons})
        return
    }
    cupons = 'utilizados'
    this.setState({cupons})
  }

  style = {
      toggleBtn: {
        borderWidth: 0,
        borderStyle: 'solid',
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        cursor: 'pointer'
      },
      toggleLeftBtn: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
      },
      toggleRightBtn: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        paddingRight: 10,
        paddingLeft: 10,
      },
      toggleAtivo: {
          borderWidth: 1,
          borderColor: '#feca03',
          backgroundColor: '#feca03',
          color: 'black'
      },
      toggleInativo: {
          borderWidth: 1,
          borderColor: '#bdbabc',
          backgroundColor: 'transparent',
          color: '#bdbabc'
      },
  }
}