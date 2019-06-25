import React from 'react';
import View from '../ui/View';
import Slider from "react-slick";
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import RodapeCompleto from '../components/RodapeCompleto';
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
        utilizado: false,
        atualizaCodigo: null
    }
    constructor() {
        super()
        this.atualizaCodigo = this.atualizaCodigo.bind(this)
    }

    async atualizaCodigo(id_cupom) {
        const cupomId = id_cupom || this.state.cupomId
        if(!this.state.loadingCodigo && cupomId) {
            this.props.getCupomById(cupomId)
            .then(cupom => {
                if(!cupom) {
                    cupom = this.props.cupons.find((cupom) => Number(cupom.id) === Number(this.props.cupomId))
                    console.log("cupom carregado da lista local", cupom)
                } 
                const pessoa = cupom.pessoas[0]
                if(!pessoa) return;
                const codigo = pessoa.pivot.codigo_unico
                const utilizado = pessoa.pivot.cupom_utilizado_venda
                this.setState({
                    codigo,
                    utilizado,
                    loadingCodigo: false
                })
            })
            .catch((e) => {
                console.log("erro ao carergar cupom", e)
            })
        }
    }

    componentDidMount() {
        this.setState({ atualizaCodigo: this.atualizaCodigo })
        this.atualizaCodigo()
    }

    static getDerivedStateFromProps(props, state) {
        if(!state.codigo && state.atualizaCodigo && props.cupomId) {
            state.atualizaCodigo(props.cupomId)
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
            {!this.state.utilizado && this.state.codigo  && (
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

            { this.state.utilizado && <>
                <RubikText 
                    bold={true}
                    style={{ 
                        backgroundColor: '#aaaaaa', 
                        color: '#777777',
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
                <RubikText style={{alignSelf: 'center'}}>Este cupom já foi utilizado para venda.</RubikText>
            </>}
            { !this.state.utilizado && !this.state.codigo && this.state.usuario && (this.state.usuario.id_vestylle) && (
            <TouchableHighlight
            style={this.style.btnAtivar}
            onPress={() => this.ativaCupom()}
            >
                <RubikText bold={true} style={{color: 'white'}}>ATIVAR CUPOM</RubikText>
            </TouchableHighlight>
            )}
            
            {!this.state.utilizado && !this.state.usuario.cpf && !this.state.usuario.id_vestylle &&
            <Link to="/meuperfil" style={{flexDirection: 'column', alignItems: 'center'}}>
                <View><RubikText bold={true}>ATUALIZAR CPF</RubikText></View>
                <RubikText>Atualize seu CPF para habilitar a ativação de cupons.</RubikText>
            </Link>
            }
            {!this.state.utilizado && this.state.usuario.cpf && !this.state.usuario.id_vestylle &&
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
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
        cupomId: null,
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
            return {
                cupomId: props.cupomId,
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    componentDidUpdate() {
        if(this.state.cupom || !this.state.cupomId) {
            return
        }
        this.props.getCupomById(this.state.cupomId)
        .then(cupom => {
            if(!cupom) {
                cupom = this.props.cupons.find((cupom) => Number(cupom.id) === Number(this.props.cupomId))
                console.log("cupom carregado da lista local", cupom)
            } 
            this.setState({
                cupom,
                loading: false
            })
                console.log("cupom carregado", cupom)
        })
        .catch(() => {
           let cupom = this.props.cupons.find((cupom) => Number(cupom.id) === Number(this.props.cupomId))
            this.setState({
                cupom,
                loading: false
            })
            console.log("cupom carregado da lista local", cupom)
        })
    }

    componentDidMount() {
        if(!this.state.cupom &&
           (!this.props.cupons || 
            this.props.cupons.length === 0)) {
                
            this.props.atualizaCupons()
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
            
        { this.state.cupom.fotos_listagem && this.state.cupom.fotos_listagem.length > 0 &&
          <View style={{marginBottom: 50}}>
            <Slider {...this.sliderSettings}>
              {this.state.cupom.fotos_listagem.map((foto, key) => (
                <div style={{ position: 'relative'}}>
                    <div style={{display:'flex'}}>

                    <img 
                      style={{
                        objectFit:'cover', 
                      }} 
                      alt={this.state.cupom.titulo}
                      className="img-slider-wide"
                      key={key}
                      src={foto.urlCloudinary}/>
                    </div>
                </div>
              ))}
            </Slider> 
          </View>
        }
        { (!this.state.cupom.fotos_listagem || this.state.cupom.fotos_listagem.length === 0) &&
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
            <RubikText style={{fontSize: 16, marginBottom: 5}}>
                {this.state.cupom.texto_cupom}
            </RubikText>
            { this.state.cupom.data_validade && (
            <RubikText style={{fontSize: 14}}>
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

        <UserConsumer>
        {({cupons, atualizaCupons, getCupomById}) => (
            <DadosCupom
                cupons = {cupons}
                cupomId = {this.state.cupomId}
                atualizaCupons = {atualizaCupons}
                getCupomById = {getCupomById}
            />
        )}
        </UserConsumer>

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
        {({perfil, ativaCupom, atualizaCuponsUtilizados, getCupomById, cuponsUtilizados}) => {
            const cupomId = this.state.cupomId;
            return (
            <CodigoCupom
                cupomId = {cupomId}
                usuario={perfil}
                ativaCupom={ativaCupom}
                atualizaCuponsUtilizados={atualizaCuponsUtilizados}
                cuponsUtilizados={cuponsUtilizados}
                getCupomById = {getCupomById}
            />
        )}}
        </UserConsumer>

      <RodapeCompleto/>
    </View>
    )
  }
}