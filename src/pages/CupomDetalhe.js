
import React from 'react';
import View from '../ui/View';
import Breadcrumb from '../ui/Breadcrumb';
import RubikText from '../ui/RubikText';
import Header from '../components/Header';
import RodapeCompleto from '../components/RodapeCompleto';
import { LojaConsumer } from '../LojaContext';
import { FaSpinner } from 'react-icons/fa';

class DadosCupom extends React.Component {
    state = {
        cupom : null,
        loading: true
    }

    static getDerivedStateFromProps(props, state) {
        if (props.cupomId && 
            props.cupons && 
            props.cupons.length > 0) {


            const cupom = props.cupons.find((cupom) => Number(cupom.id) === Number(props.cupomId))
            console.log(cupom)
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

        <img
            src={this.state.cupom.foto_caminho || this.state.cupom.oferta.urlFoto}
            alt={this.state.cupom.titulo}
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