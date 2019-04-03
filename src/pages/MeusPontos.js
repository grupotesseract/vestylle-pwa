import React from 'react';
import View from '../ui/View';
import { UserConsumer } from '../UserContext';
import RubikText from '../ui/RubikText';
import Header from '../components/Header'
import RodapeCompleto from '../components/RodapeCompleto'
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaStar } from 'react-icons/fa';

export default class MeusPontos extends React.Component {

  state = {
    qtdPontos: 333,
  }

  render() {
    return ( <View>
      <Header/>
      <View style={{backgroundColor: "#1e1e1c"}}>
        <Breadcrumb>
          <Link to="/meuspontos"><RubikText>Área do Cliente &gt;&nbsp;</RubikText></Link>
          <RubikText bold={true}>Meus pontos</RubikText>
        </Breadcrumb>
        <View style={{padding: 20, alignItems: 'center'}}>
          <RubikText style={{color: 'white'}}>Suas compras</RubikText>
          <RubikText style={{color: 'white'}}>acumulam pontos</RubikText>

          <UserConsumer>
          {({ logout }) => (<>
          <View style={{alignSelf: 'stretch'}}>
            <View style={{width:100, alignSelf: 'center', marginTop: 20}}>
              <CircularProgressbar
                percentage={this.state.qtdPontos/10}
                text={this.state.qtdPontos}
                styles={{
                  path: {
                    stroke: '#55bcba'
                  },
                  trail: {
                    stroke: '#585756'
                  },
                  text: {
                    fill: 'white',
                    fontSize: 23,
                  }
                }}
              />
            </View>
            <View style={{alignItems: 'flex-start', alignSelf: 'stretch', textAlign: 'left', marginTop: 20}}>
              { this.state.qtdPontos === 0 && (<>
                <RubikText style={this.style.fonteDestaque}>Você ainda não possui pontos.</RubikText>
                <RubikText style={{color: 'white'}}>Para começar a acumular pontos, utilize seu CPF nas próximas compras na loja Vestylle Megastore Jaú. Seus pontos aparecerão aqui.</RubikText>
              </>)}
              { this.state.qtdPontos > 0 && this.state.qtdPontos < 1000 && (<>
                <RubikText style={{color: 'white'}} bold={true}>Ciclana,</RubikText>
                <RubikText style={this.style.fonteDestaque}>Você ainda não possui nenhum bônus promocional.</RubikText>
                <RubikText style={{color: 'white'}}>Junte mais { 1000 - this.state.qtdPontos } pontos para garantir seu bônus</RubikText>
              </>)}
              { this.state.qtdPontos >= 1000 && (<>
                <RubikText style={{color: 'white'}} bold={true}>Parabéns Ciclana,</RubikText>
                <RubikText style={{color: 'white'}} bold={true}>você completou 1000 pontos.</RubikText>
                <RubikText style={this.style.fonteDestaque}>E ganhou um bônus de R$60,00</RubikText>
                <RubikText style={{color: 'white'}}>para gastar como quiser.</RubikText>
                <View style={{flexDirection: 'row', alignSelf: 'center', margin: 10}}>
                  <View style={{backgroundColor: "#55bcba", width: 40}}>
                    <RubikText bold={true} style={{width:100 ,fontSize: 10, color: "white", transform: [{rotate:'-90deg'},{translateY:-29},{translateX:-14}]}}>MIL PONTOS</RubikText>
                  </View>
                  <View style={{backgroundColor: "white", padding: 5}}>
                    <RubikText bold ={true} style={{fontSize: 36 ,borderWidth: 1, borderColor:"#55bcba" ,padding: 10, paddingTop: 15}}>R$ 60,00</RubikText>
                  </View>
                </View>

                <RubikText style={{color: 'white'}}>Junte mais {1000 - this.state.qtdPontos%1000 } pontos para ganhar outro bônus</RubikText>
              </>)}
            </View>
          </View>

          </>)}
          </UserConsumer>

        </View>
      </View>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <RubikText 
          style={{ 
            backgroundColor: '#bdbabc', 
            padding: 4,
            paddingRight: 10, 
            paddingLeft: 20, 
            marginBottom: 5,
            alignSelf: 'flex-start',
          }} 
          bold={true}>
        Como resgatar seus pontos?
        </RubikText>
        <RubikText style={{paddingLeft: 20}}>Para utilizar seus pontos, informe seu</RubikText>
        <RubikText style={{paddingLeft: 20}}>CPF na próxima compra.</RubikText>
      </View>
      <View style={{alignItems: 'center'}}>
        <RubikText 
          bold={true} 
          style={{
            backgroundColor:"#feca03",
            fontSize: 16,
            padding: 5,
            paddingLeft: 30,
            paddingRight: 30,
            zIndex: 2
          }}>
          COMO FUNCIONA?
        </RubikText>
        <View style={{zIndex: 1, alignSelf: 'stretch', alignItems: 'center', marginTop: -10, backgroundColor: "#585756"}}>
          <RubikText bold={true} style={{padding: 20, paddingTop: 30, fontSize: 26, color: 'white'}}>R$1,00 = 1 ponto</RubikText>
        </View>
        <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#3e3e3f"}}>
          <View style={{flexDirection:"row", paddingTop: 20}}>
            <img
              alt=""
              src={require('../assets/bags.png')}
              resizeMode="contain"
              style={{ height: 75, width:75,  marginRight: -5, marginBottom: 20 }}
            />
            <View style={{flexDirection:"column"}}>
              <View>
                <RubikText style={{fontSize: 20, color:'white'}}>A cada</RubikText>
              </View>
              <View style={{flexDirection:"row", paddingLeft: 10}}>
                <RubikText bold={true} style={{fontSize: 30, color: 'white', marginTop: -5}}>1000</RubikText>
                <RubikText style={{fontSize: 24, color: 'white'}}>PONTOS</RubikText>
              </View>
            </View>
          </View>
        </View>
        <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#2d2e2b"}}>
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <RubikText style={{color: 'white', fontSize: 16}}>VOCÊ GANHA</RubikText>
              <RubikText style={{color: 'white', fontSize: 16}}>1 BÔNUS no valor</RubikText>
              <View style={{flexDirection: 'row'}}>
                <RubikText style={{color: 'white', fontSize: 16}}>de </RubikText>
                <RubikText bold={true} style={{color: 'white', fontSize: 16}}>R$60,00</RubikText>
              </View>
            </View>
            <View style={{paddingLeft: 10}}>
              <FaStar
                size={60}
                color="#feca03"
              />
            </View>
          </View>
        </View>
      </View>
      <RodapeCompleto/>
    </View>
    )
  }

  style = {
    fonteDestaque: {
      fontWeight: 'bold',
      color: '#58bcba'
    }
  }
}