import React, { Component } from 'react';
import View from '../ui/View';
import { IoMdHome, IoMdQrScanner, IoMdShirt, IoMdPin } from 'react-icons/io'
// import { MdPerson } from 'react-icons/md';
import { FaStar, FaHeart, FaWhatsapp,  FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import RubikText from '../ui/RubikText';

class MenuButton extends React.Component {
  render() {
    return (
        <Link 
          to={this.props.page}
          style={{ 
            flexDirection: 'row',
            flexGrow: 1,
         }}
        >
          <this.props.icon 
            size={16}
            style={{justifyContent: 'flex-end' }}
            color="#6b6b6b"
          />
          <RubikText style={{
            color: '#6b6b6b',
            textTransform: 'uppercase',
            paddingRight: 15,
            fontSize: 14,
            textAlign: 'left'
          }}>{this.props.label.toUpperCase()}</RubikText>
        </Link>
    )
  }
}

class MenuWide extends Component {
    render() {
        return <View style={{
            borderTopWidth: 0,
            borderBottomWidth: 2,
            borderColor: "#bdbbbc",
            backgroundColor: "white",
            paddingTop: 7,
            paddingBottom: 8,
            boxShadow: '0 2px 2px rgba(0,0,0,0.2)'
        }}>
            <View className="container" style={{
                flexDirection: "row",
                justifyContent: "space-around",
            }}>
            <MenuButton 
                label="Início"
                page="/"
                icon={IoMdHome}
            />
            {/* <MenuButton 
                label="Área do Cliente"
                page="/areacliente"
                icon={MdPerson}
            /> */}
            <MenuButton 
                label="Meus Pontos"
                page="/meuspontos"
                icon={FaStar}
            />
            <MenuButton 
                label="Meus Cupons"
                page="/meuscupons"
                icon={FaWallet}
            />
            <MenuButton 
                label="Adicionar Cupom"
                page="/adicionarcupom"
                icon={IoMdQrScanner}
            />
            <MenuButton 
                label="Lista de Desejos"
                page="/listadesejos"
                icon={FaHeart}
            />
            <MenuButton 
                label="Produtos"
                page="/produtos"
                icon={IoMdShirt}
            />
            <MenuButton 
                label="Loja"
                page="/loja"
                icon={IoMdPin}
            />
            <MenuButton 
                label="Fale Conosco"
                page="/faleconosco"
                icon={FaWhatsapp}
                noborder={true}
            />
            </View>
        </View>
    }
}


export default MenuWide;