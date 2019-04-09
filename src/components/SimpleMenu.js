import React, { Component } from 'react';
import View from '../ui/View';
import { IoMdQrScanner } from 'react-icons/io';
import { FaStar, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom'

class SimpleMenu extends Component {

  render() {
    return <View style={this.style.container}>
      <Link
        to = "/qrcode"
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
      <Link
        to="/whats"
      >
        <FaWhatsapp
          name="whatsapp"
          size={26}
          style={this.style.icon}
        />
      </Link>
    </View>
  }

  goTo = (page) => {
    this.props.navigation.navigate(page)
  }

  style = {
    container: {
      borderTopWidth: 2,
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