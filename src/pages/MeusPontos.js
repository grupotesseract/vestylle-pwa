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
import LaughingSmiling from '../ui/LaughingSmiling';
import ReactGA from 'react-ga';

class DisplayPontos extends React.Component {

  state = {
    nome: '',
    qtdPontos: 0,
    data_vencimento: null
  }

  componentDidMount() {
    this.setState({
      qtdPontos: this.props.qtdPontos || 0,
      data_vencimento: this.datetime2DDMMAAAA(this.props.data_vencimento),
      nome: this.props.nome || '',
    })
    this.props.atualizaPerfil()
    .then(() => {
      this.setState({
        qtdPontos: this.props.qtdPontos || 0,
        data_vencimento: this.datetime2DDMMAAAA(this.props.data_vencimento),
        nome: this.props.nome || '',
      })
    })
    ReactGA.pageview('/meuspontos');
  }

  datetime2DDMMAAAA = (datetime) => {
    if(!datetime) return "";
    const date = datetime.split(" ")[0].split("-");
    const year = date[0]
    const month = date[1]
    const day = date[2]
    return day+"/"+month+"/"+year
  }

  render() {
    const qtdBonus = Math.floor(this.state.qtdPontos/1000)
    return( 
    <View style={{alignSelf: 'stretch', alignItems:'center'}} className="md-flexrow">
      <View className="md-50-hard circulo-pontos">
      <View style={{width:100, marginTop: 20}}>
        <CircularProgressbar
          percentage={this.state.qtdPontos/10}
          text={this.state.qtdPontos.toString()}
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
      </View>
      <View className="md-50" style={{alignItems: 'flex-start', alignSelf: 'stretch', textAlign: 'left', marginTop: 20}}>
        { this.state.qtdPontos === 0 && (<>
          <RubikText style={this.style.fonteDestaque}>Você ainda não possui pontos.</RubikText>
          <RubikText style={{color: 'white'}}> Para começar a acumular pontos, insira seu CPF em <Link to="MeuPerfil" style={{display: 'inline'}}><b style={{display: 'inline'}}>Meu Perfil</b></Link> e utilize-o nas próximas compras na loja Vestylle Megastore Jaú. Seus pontos aparecerão aqui. </RubikText>
        </>)}
        { this.state.qtdPontos > 0 && this.state.qtdPontos < 1000 && (<>
          { this.state.nome !== '' && (
            <RubikText style={{color: 'white'}} bold={true}>{this.state.nome},</RubikText>
          )}
          <RubikText style={this.style.fonteDestaque}>Você ainda não possui nenhum bônus promocional.</RubikText>
          <RubikText style={{color: 'white'}}>Junte mais { 1000 - this.state.qtdPontos } pontos para garantir seu bônus</RubikText>
        </>)}
        { this.state.qtdPontos >= 1000 && (<>
          <RubikText style={{color: 'white'}} bold={true}>Parabéns {this.state.nome},</RubikText>
          <RubikText style={{color: 'white'}} bold={true}>você completou { 1000 * qtdBonus } pontos.</RubikText>
          <RubikText style={this.style.fonteDestaque}>E ganhou { qtdBonus } bônus de R$60,00</RubikText>
          <RubikText style={{color: 'white'}}>para gastar como quiser.</RubikText>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start', margin: 10}}>
            <View style={{backgroundColor: "#55bcba", width: 20}}>
            </View>
            <View style={{backgroundColor: "white", padding: 5}}>
              <RubikText bold ={true} style={{fontSize: 30 ,borderWidth: 1, borderColor:"#55bcba" ,padding: 8, paddingTop: 10}}>R$ { 60 * qtdBonus },00</RubikText>
            </View>
          </View>

          <RubikText style={{color: 'white'}}>Junte mais {1000 - this.state.qtdPontos%1000 } pontos para ganhar outro bônus</RubikText>
          {this.state.data_vencimento && (
            <RubikText style={{color: 'white', fontSize: 12}}>Bônus válido até {this.state.data_vencimento}</RubikText>
          )}
        </>)}
      </View>
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
export default class MeusPontos extends React.Component {


  render() {
    return ( <View>
      <Header/>
      <View style={{backgroundColor: "#1e1e1c"}}>
        <View className="container">
          <Breadcrumb>
            <Link to="/areacliente"><RubikText>Área do Cliente &gt;&nbsp;</RubikText></Link>
            <RubikText bold={true}>Meus pontos</RubikText>
          </Breadcrumb>
          <View style={{padding: 20, alignItems: 'center'}}>
            <View className="md-flexrow">
              <LaughingSmiling style={{color: 'white', fontSize: 26}}>Suas compras</LaughingSmiling>
              <LaughingSmiling style={{color: 'white', fontSize: 26, margin: 10, marginTop: 0}}>acumulam pontos</LaughingSmiling>
            </View>

            <UserConsumer>
            {({ perfil, getDadosMeuPerfil }) => {
              if(!perfil) {
                return <></>
              }
              return <DisplayPontos 
                qtdPontos={perfil.saldo_pontos}
                data_vencimento={perfil.data_vencimento_pontos}
                nome={perfil.nomeSimples || perfil.nome}
                atualizaPerfil={getDadosMeuPerfil}
              />
            }}
            </UserConsumer>

          </View>
        </View>
      </View>
      <View className="container md-flexrow" style={{paddingTop: 20, paddingBottom: 20}}>
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
        <View>
          <RubikText style={{paddingLeft: 20}}>Para utilizar seus pontos, informe seu</RubikText>
          <RubikText style={{paddingLeft: 20}}>CPF na próxima compra.</RubikText>
        </View>
      </View>
      <View style={{alignItems: 'center'}} className="hide-md">
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
        <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#585756"}}>
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
        <View style={{alignSelf: 'stretch', borderTopWidth: 1, borderColor:'white', alignItems: 'center', backgroundColor: "#585756"}}>
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

}