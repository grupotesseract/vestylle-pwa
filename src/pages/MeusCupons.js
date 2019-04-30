
import React from 'react';
import View from '../ui/View';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import ButtonBorder from '../ui/ButtonBorder';


class ListaCupons extends React.Component {
    state = {
        cupons: [
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
         "subtitulo":"generate mission-critical systems",
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
        ]
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
                    Válido até {cupom.data_validade}
                </RubikText>
                <ButtonBorder
                    title="VER DETALHES"
                    style={{
                        backgroundColor: '#e20f17',
                        color: 'white',
                        paddingRight: 30,
                        paddingLeft: 30,
                        borderRadius: 5
                    }}
                />
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

  render() {
    return ( <View>
      <Header/>

      <View style={{backgroundColor: "#585756"}}>
        <Breadcrumb>
            <RubikText style={{color: 'white'}}>Área do cliente &gt;&nbsp;</RubikText>
            <RubikText bold={true} style={{color: 'white'}}>Meus cupons</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
            <View>
                Ativos | Utilizados
            </View>
            <ListaCupons/>
        </View>
      </View>
    </View>
    )
  }
}