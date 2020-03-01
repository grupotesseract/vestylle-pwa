import React, { Component } from 'react';
import View from '../ui/View';
import { IoMdQrScanner } from 'react-icons/io';
import { FaStar, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import TouchableHighlight from '../ui/TouchableHighlight';
import { LojaConsumer } from '../LojaContext'

class SimpleMenu extends Component {

  render() {
    if(this.props.windowSize && this.props.windowSize.md) {
      return <></>
    }
    return <View style={this.style.container}>
      <Link
        to = "/adicionarcupom"
      >
        <IoMdQrScanner
          size={26}
          style={this.style.icon}
        />
      </Link>
      <Link
        to = "/meuspontos"
      >
        <FaStar
          size={26}
          style={this.style.icon}
        />
      </Link>
      <Link
        to = "/listadesejos"
      >
        <FaHeart
          size={26}
          style={this.style.icon}
        />
      </Link>
      <LojaConsumer>
        {({ atualizaDadosLoja, dadosLoja }) =>
            <TouchableHighlight
              onPress={() => window.open("http://api.whatsapp.com/send?phone=55"+this.onlyNumbers(dadosLoja.whatsapp))}>
              <FaWhatsapp
                name="whatsapp"
                size={26}
                style={this.style.icon}
              />
            </TouchableHighlight>
        }
      </LojaConsumer>
    </View>
  }

  goTo = (page) => {
    this.props.navigation.navigate(page)
  }

  onlyNumbers(str) {
    return str.replace(/\D/g, '');
  }
  

  style = {
    container: {
      borderTopWidth: 0,
      borderBottomWidth: 2,
      borderColor: "#bdbbbc",
      flexDirection: "row",
      backgroundColor: "#ebebeb",
      paddingTop: 7,
      paddingBottom: 8,
      justifyContent: "space-around"
    },
    icon: {
      color: "#bdbbbc"
    }
  }
}

export default SimpleMenu