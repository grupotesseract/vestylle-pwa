import React from 'react';
import View from '../ui/View';
import Slider from "react-slick";
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import RodapeCompleto from '../components/RodapeCompleto';
import { LojaConsumer } from '../LojaContext';
import { FaSpinner } from 'react-icons/fa';
import TouchableHighlight from '../ui/TouchableHighlight';
import { UserConsumer } from '../UserContext';
import { Link } from 'react-router-dom'


class CodigoCupom extends React.Component {

    state = {
        codigo : null,
        cupomId: null,
        usuario: null,
        loadingCodigo: false,
        atualizaCodigo: null
    }
    constructor() {
        super()
        this.atualizaCodigo = this.atualizaCodigo.bind(this)
    }

    async atualizaCodigo() {
        if(!this.state.loadingCodigo) {
            if(this.props.atualizaCuponsUtilizados) {
                this.setState({loadingCodigo: true})
                const cupom = await this.props.atualizaCuponsUtilizados()
                .then(cuponsUtilizados => {
                    if(!cuponsUtilizados){
                        return null
                    }
                    const cupom = cuponsUtilizados.find(c => Number(c.id) === Number(this.state.cupomId) )
                    return cupom
                })
                if(cupom) {
                    const codigoTxt = cupom.codigo_unico
                    this.setState({codigo: codigoTxt})
                }
            }
        }
    }

    componentDidMount() {
        if(this.props.cupomId && this.props.cuponsUtilizados && this.props.cuponsUtilizados.length) {
            const cupom = this.props.cuponsUtilizados.find(c => Number(c.id) === Number(this.props.cupomId) )
            const codigoTxt = cupom.codigo_unico
            this.setState({codigo: codigoTxt})
        }
        this.setState({ atualizaCodigo: this.atualizaCodigo })
        this.atualizaCodigo()
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.codigo && state.atualizaCodigo) {
            state.atualizaCodigo()
        }
        if (props.cupomId !== state.cupomId ||
            props.usuario !== state.usuario) {
            return {
                cupomId: props.cupomId,
                usuario: props.usuario
            }
        } 
        return null;
    }

    render() {
        if(!this.state.usuario) {
            return <> </>
        }
        return (
        <View style={{ 
            backgroundColor: '#feca03', 
            alignSelf: 'stretch',
            padding: 20
        }}>
            {this.state.codigo  && (
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
                {this.state.codigo}
            </RubikText>
            )}


            {!this.state.codigo && this.state.usuario && this.state.usuario.id_vestylle && (
            <TouchableHighlight
            style={this.style.btnAtivar}
            onPress={() => this.ativaCupom()}
            >
                <RubikText bold={true} style={{color: 'white'}}>ATIVAR CUPOM</RubikText>
            </TouchableHighlight>
            )}
            {!this.state.usuario.cpf && !this.state.usuario.id_vestylle &&
            <Link to="/meuperfil" style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={this.style.btnDesativado}><RubikText bold={true}>ATUALIZAR CPF</RubikText></View>
                <RubikText>Atualize seu CPF para habilitar a ativação de cupons.</RubikText>
            </Link>
            }
            {this.state.usuario.cpf && !this.state.usuario.id_vestylle &&
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={this.style.btnDesativado}><RubikText bold={true}>ATIVAR CUPOM</RubikText></View>
                <RubikText>Para utilizar seu cupom, faça seu cadastro em nossa loja!</RubikText>
            </View>
            }
        </View>
    )}

    style = {
        btnDesativado :{
            backgroundColor: '#bdbabc',
            padding: 15,
            marginTop:20,
            marginBottom:20,
            paddingRight: 30,
            paddingLeft: 30,
            alignSelf: 'center',
        },
        btnAtivar:{
              backgroundColor: '#e20f17',
              padding: 15,
              marginTop:20,
              marginBottom:20,
              paddingRight: 30,
              paddingLeft: 30,
              alignSelf: 'center',
              cursor: 'pointer'
        }
    }

    ativaCupom() {
        this.props.ativaCupom(this.state.cupomId)
        .then(cupomAtivo => {
            if(cupomAtivo && cupomAtivo.codigo_unico){
                this.setState({
                    codigo : cupomAtivo.codigo_unico
                })
            }
        })
        .catch(e => console.error(e))
    }
}
class DadosCupom extends React.Component {
    state = {
        cupom : null,
        loading: true
    }

  sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

    static getDerivedStateFromProps(props, state) {
        if (props.cupomId && 
            props.cupons && 
            props.cupons.length > 0) {


            const cupom = props.cupons.find((cupom) => Number(cupom.id) === Number(props.cupomId))
            return {
                cupom,
                loading: false
            };
        }

        // Return null to indicate no change to state.
        return null;
    }
    componentDidMount() {
        if(!this.state.cupom &&
           (!this.props.cupons || 
            this.props.cupons.length === 0)) {
                
            this.props.atualizaCupons()
            .then((cupons)=>{
                this.setState({loading: false})
            })
            .catch((e)=>{
                this.setState({loading: false})
            })
        }
    }

    render() {
        if(!this.state.cupom) {

            if(this.state.loading) {
            return <FaSpinner
                style={{
                fontSize: 72,
                alignSelf: 'center',
                marginTop: 60,
                marginBottom: 60
                }}
                className='spin'
            />
            } else {
                return <RubikText
                    style = {{
                        fontSize: 22,
                        alignSelf: 'center',
                        marginTop: 30,
                        marginBottom: 20
                    }}
                > 
                    Cupom não encontrado.
                </RubikText>
            }
        }
        console.log(this.state)
        return <>
        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 20}}>
          <View style={{alignItems: 'center'}} >
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
                {this.state.cupom.titulo}
              </RubikText>
              <RubikText 
                style={{
                borderTop: 1,
                borderColor: 'black',
                borderStyle: 'solid',
                justifyContent: 'center',
                paddingTop: 5
              }}>
                {this.state.cupom.subtitulo}
              </RubikText>
          </View>
        </View>


        <View style={{position:'relative'}}>

            {Number(this.state.cupom.porcentagem_off) > 0 &&
            <View style={{
                backgroundColor: '#e20f17',
                position: 'absolute',
                top: -3,
                right: 45,
                padding: 10,
                paddingBottom: 0,
                zIndex: 3
            }}
            className="bandeirola">
                <RubikText bold={true} 
                style={{
                    fontSize:22,
                    color: 'white'
                }}>{this.state.cupom.porcentagem_off}%</RubikText>
                <RubikText bold={true} 
                style={{
                    fontSize:20,
                    color: 'white',
                    flexDirection: 'column',
                    marginTop: -2
                }}>OFF</RubikText>
            </View>
            }
            
        { this.state.cupom.fotos && this.state.cupom.fotos.length > 0 &&
          <View style={{marginBottom: 50}}>
            <Slider {...this.sliderSettings}>
              {this.state.cupom.fotos.map((foto, key) => (
                <div style={{ position: 'relative'}}>
                    <div style={{display:'flex'}}>

                    <img 
                      style={{
                        objectFit:'cover', 
                      }} 
                      alt={this.state.cupom.titulo}
                      className="img-slider"
                      key={key}
                      src={foto.urlCloudinary}/>
                    </div>
                </div>
              ))}
            </Slider> 
          </View>
        }
        { (!this.state.cupom.fotos || this.state.cupom.fotos.length === 0) &&
            <img
                src={this.state.cupom.foto_caminho || (this.state.cupom.oferta && this.state.cupom.oferta.urlFoto)}
                alt={this.state.cupom.titulo}
                style={{
                    borderTop: 1,
                    borderBottom: 1,
                    borderStyle: 'solid',
                    borderColor: '#585756',
                    objectFit: 'contain',
                    width: '100%'
                }}
            />
        }
        </View>

        <View style={{padding: 15, marginRight: 20, marginLeft: 20, textAlign: 'left'}}>
            <RubikText style={{fontSize: 18, marginBottom: 5}}>
                {this.state.cupom.texto_cupom}
            </RubikText>
            { this.state.cupom.data_validade && (
            <RubikText>
                Esse cupom é válido até {this.datetime2DDMMAAAA(this.state.cupom.data_validade)}
            </RubikText>
            )}
        </View>
      </> 
    }

    datetime2DDMMAAAA = (datetime) => {
        if(!datetime) return "";
        const date = datetime.split(" ")[0].split("-");
        const year = date[0]
        const month = date[1]
        const day = date[2]
        return day+"/"+month+"/"+year
    }
}

export default class CupomDetalhe extends React.Component {

    state = {
        cupomId: null
    }

  componentDidMount() {
    const { match: { params } } = this.props;
    const cupomId = params.cupomId
    this.setState({
      cupomId
    })
  }

  render() {
    return ( <View>
      <Header/>

      <View>
        <Breadcrumb>
            <RubikText style={{color: '#585756'}}>Meus cupons &gt;&nbsp;</RubikText>
            <RubikText bold={true} style={{color: '#585756'}}>Detalhes do cupom</RubikText>
        </Breadcrumb>
      </View>

        <LojaConsumer>
            {({cupons, atualizaCupons}) => (
            <DadosCupom
                cupons = {cupons}
                cupomId = {this.state.cupomId}
                atualizaCupons = {atualizaCupons}
            />
            )}
        </LojaConsumer>

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

        <UserConsumer>
        {({perfil, ativaCupom, atualizaCuponsUtilizados, cuponsUtilizados}) => {
            return (
            <CodigoCupom
                cupomId = {this.state.cupomId}
                usuario={perfil}
                ativaCupom={ativaCupom}
                atualizaCuponsUtilizados={atualizaCuponsUtilizados}
                cuponsUtilizados={cuponsUtilizados}
            />
        )}}
        </UserConsumer>

      <RodapeCompleto/>
    </View>
    )
  }
}