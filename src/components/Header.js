import React, { Component } from 'react';
import logo from '../assets/logofull.png';
import Menu from './Menu';
import { MdMenu as MenuIcon } from 'react-icons/md';
import { Link } from 'react-router-dom'
import View from '../ui/View';
import RubikText from '../ui/RubikText';
import MenuWide from './MenuWide';
import { UserConsumer } from '../UserContext';
import { FaInstagram } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';

class OlaUsuario extends Component {
    render() {
        if(this.props.isAuth && this.props.perfil) {
            return <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{
                    fontSize:12, 
                    justifyContent: 'center', 
                    alignItems: 'flex-end',
                    padding:10
                }}
                >
                <RubikText>Olá {this.props.perfil.nomeSimples || this.props.perfil.nome},</RubikText>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <View style={{flexDirection: 'row'}}>
                    <RubikText> acesse sua&nbsp;</RubikText><Link to="/areacliente" style={{borderBottom: '1px solid black'}}>área do cliente</Link>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <RubikText> ou&nbsp;</RubikText>
                    <UserConsumer>
                    {({ logout }) => (
                    <button onClick={logout} >
                        <RubikText style={{borderBottom: '1px solid black'}}>faça logoff</RubikText>
                    </button>
                    )}
                    </UserConsumer>
                </View>
                </View>

                </View> 
                <View style={{ alignItems: 'center', padding: 20, flexDirection: 'row'}}>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/vestyllejau/" >
                    <FaInstagram
                        size={32}
                    />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/vestyllejau/">
                    <IoLogoFacebook
                        size={32}
                    />
                    </a>
                </View>
            </View>
        } 
        return <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <View
            style={{
                fontSize:12, 
                justifyContent: 'center', 
                alignItems: 'flex-end',
                padding:10
            }}
            >
                <RubikText>Olá visitante,</RubikText>
                <View style={{flexDirection: 'row'}}>
                    <Link to="/login" style={{borderBottom: '1px solid black'}}>entre</Link><RubikText>&nbsp;ou&nbsp;</RubikText><Link to="cadastro" style={{borderBottom: '1px solid black'}}>cadastre-se</Link>
                </View>
            </View>
            <View style={{ alignItems: 'center', padding: 20, flexDirection: 'row'}}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/vestyllejau/" >
                <FaInstagram
                    size={32}
                />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/vestyllejau/">
                <IoLogoFacebook
                    size={32}
                />
                </a>
            </View>
        </View>
    }
}

class Header extends Component {

  state = {
    windowSize: {
      sm: true,
      md: false,
      lg: false
    },
    showMenu: false
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
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

    render() {
        const mdSize = this.state.windowSize && this.state.windowSize.md
        return <>
        <div style={{borderBottom:'2px solid #bdbabc',flexDirection: 'row', alignSelf: 'stretch'}}>
            <div style={{
                width: mdSize ? 245 : 55,
                alignItems: 'center',
                justifyContent: 'center'
            }}>

            </div>
                
            <Link to="/" style={{
                flexGrow: 1,
            }}>
            <img src={logo} style={{
                flexGrow: 1,
                maxHeight: 50,
                padding: mdSize ? 20 : 10 
}} alt="logo" />
            </Link>
            
            { !mdSize ?
                <>
                <button 
                    style={this.style.sideContent}
                    onClick={this.toggleMenu}
                >
                    <MenuIcon size={36}/>
                </button>
                <Menu 
                    visible={this.state.showMenu}
                    toggleMenu={this.toggleMenu}
                />
                </>
                :
                <UserConsumer>
                {({perfil, isAuth}) => (
                    <OlaUsuario
                        perfil={perfil}
                        isAuth={isAuth}
                    />
                )}
                </UserConsumer>
            }
        </div>
        { mdSize ?
        <MenuWide/>
        : <></>
        }
        </>
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    style = {
        sideContent: {
        },
    }
}


export default Header;