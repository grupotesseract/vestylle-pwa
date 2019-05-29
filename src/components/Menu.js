import React, { Component } from 'react';
import View from '../ui/View';
import { IoMdHome, IoMdQrScanner, IoMdShirt, IoMdPin } from 'react-icons/io'
import { MdPerson } from 'react-icons/md';
import { FaStar, FaHeart, FaWhatsapp, FaArrowLeft, FaPowerOff, FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UserConsumer } from '../UserContext';

class MenuButton extends React.Component {
  render() {
    return (
        <Link 
          to={this.props.page}
          style={{ flexDirection: 'row', }}
          onClick={this.props.toggleMenu}
        >
          <this.props.icon 
            size={26}
            style={{padding: 10, justifyContent: 'center', width: 46 }}
            color="white"
          />
          <span style={{
            flexGrow: 1,
            borderBottomColor: '#ffffff',
            borderBottomStyle: 'solid',
            borderBottomWidth: this.props.noborder ? 0 : 1,
            color: 'white',
            textTransform: 'uppercase',
            padding: 5,
            paddingTop: 15,
            fontSize: 14,
            textAlign: 'left'
          }}>{this.props.label.toUpperCase()}</span>
        </Link>
    )
  }
}

class Menu extends Component {
    render() {
        return <View style={{
            display: this.props.visible ? 'flex' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            alignItems: 'stretch', 
            justifyContent: 'center', 
            backgroundColor: "#111",
            padding: 30,
            paddingLeft: 10,
            boxSizing: 'border-box',
            zIndex:9
        }}>
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Início"
                page="/"
                icon={IoMdHome}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Área do Cliente"
                page="/areacliente"
                icon={MdPerson}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Meus Pontos"
                page="/meuspontos"
                icon={FaStar}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Meus Cupons"
                page="/meuscupons"
                icon={FaWallet}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Adicionar Cupom"
                page="/adicionarcupom"
                icon={IoMdQrScanner}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Lista de Desejos"
                page="/listadesejos"
                icon={FaHeart}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Produtos"
                page="/produtos"
                icon={IoMdShirt}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Loja"
                page="/loja"
                icon={IoMdPin}
            />
            <MenuButton 
                toggleMenu={this.props.toggleMenu} 
                label="Fale Conosco"
                page="/faleconosco"
                icon={FaWhatsapp}
                noborder={true}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <button 
                onClick={this.props.toggleMenu}
            >
                <FaArrowLeft
                style={{padding: 10, justifyContent: 'center', width: 46 }}
                size={26}
                color="white"
                />
            </button>
            <UserConsumer>
            {({ logout }) => (<>
            <button 
                onClick={() => this.logoutAndClose(logout)}
            >
                <FaPowerOff
                style={{padding: 10, justifyContent: 'center', width: 46 }}
                size={26}
                color="white"
                />
            </button>
            </>
            )}
            </UserConsumer>
            </View>
        </View>
    }

    logoutAndClose(logout) {
        const toggleMenu = this.props.toggleMenu
        logout()
        toggleMenu()
    }

}


export default Menu;