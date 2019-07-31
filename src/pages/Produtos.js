import React from 'react';
import View from '../ui/View';
import Header from '../components/Header'
import RubikText from '../ui/RubikText';
import RodapeCompleto from '../components/RodapeCompleto';
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb';
import LaughingSmiling from '../ui/LaughingSmiling';
import { UserConsumer } from '../UserContext';
import { FaRegHeart, FaTh, FaSquare } from 'react-icons/fa';
import CupomBoasVindas from '../components/CupomBoasVindas';
import TouchableHighlight from '../ui/TouchableHighlight';
import ReactGA from 'react-ga';
import ListaProdutos from '../ui/ListaProdutos'

export default class Produtos extends React.Component {

  state = {
    visualizacao: 'full',
    windowSize: {
      sm: true,
      md: false,
      lg: false
    }
  }

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowSize: {
        sm: true,
        md: window.innerWidth > 1023,
        lg: window.innerWidth > 1366
      }
    })
  }

  componentDidMount() {
    ReactGA.pageview('/produtos');
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return ( <View>
      <Header/>

      <View className="container">

        <Breadcrumb>
          <RubikText bold={true} style={{color: '#585756'}}>Produtos</RubikText>
        </Breadcrumb>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', padding: 20}}>
            <LaughingSmiling>Vista-se bem e com a qualidade</LaughingSmiling>
            <LaughingSmiling>das melhores marcas!</LaughingSmiling>
          </View>
        </View>

        <View style={{ padding: 10, paddingLeft: 30, paddingRight: 30}}>

          <View 
            style={{ 
              marginTop: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <Link to="/listadesejos"
            style={{
              borderTop: 2, 
              borderBottom: 2, 
              borderColor: 'black', 
              borderStyle: 'solid', 
              paddingTop: 0, 
              paddingBottom:0,
              paddingRight: 2
            }}>
              <FaRegHeart 
                size={20}
                style={{padding: 2,marginRight: 10, flexShrink: 0}}
              />
              <RubikText style={{textAlign: 'left', fontSize: 12}}> Clique aqui para mostrar produtos adicionados a sua LISTA DE DESEJOS</RubikText>
            </Link>
            { this.state.windowSize.md ? 
            <></> :
            <>
              <TouchableHighlight
              style={{marginLeft: 20}}
                onPress={() => this.setVisualizacaoMiniatura()}
              >
                <FaTh
                  size={30}
                  style={{padding: 2,margin: 2}}
                  color={this.state.visualizacao === 'thumb' ? '#585756' : '#bdbabc'}
                />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setVisualizacaoGrande()}
              >
                <FaSquare
                  size={30}
                  style={{padding: 2,margin: 2}}
                  color={this.state.visualizacao !== 'thumb' ? '#585756' : '#bdbabc'}
                />
              </TouchableHighlight>
            </>
            }
          </View>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <RubikText bold={true} style={{color: 'black'}}>Confira as novidades</RubikText>
        </View>

        <View style={{display: 'block'}}>
          <UserConsumer>
          {({listaDesejos, getOfertasComLike, atualizaOfertas, atualizaListaDesejos}) => (
              <ListaProdutos
                atualizaOfertas={atualizaOfertas}
                atualizaListaDesejos={atualizaListaDesejos}
                getOfertasComLike={getOfertasComLike}
                listaDesejos={listaDesejos}
                visualizacao={this.state.windowSize.md ? 
                  "wide-full" :
                  this.state.visualizacao}
              />
          )}
          </UserConsumer>
        </View>
      </View>
      <CupomBoasVindas/>
      <RodapeCompleto/>
    </View>
    )
  }

  setVisualizacaoGrande() {
    this.setState({ visualizacao: 'full' })
  }

  setVisualizacaoMiniatura() {
    this.setState({ visualizacao: 'thumb' })
  }
}