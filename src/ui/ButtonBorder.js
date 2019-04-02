import React, { Component } from 'react';
import RubikText from './RubikText';
import TouchableHighlight from './TouchableHighlight';
import { FaSpinner } from 'react-icons/fa';

class ButtonBorder extends Component {

  render() {
    return <TouchableHighlight 
      onPress={this.props.onPress}
      style={this.style.btnBorda}>
      {this.props.loading ? (<FaSpinner color="white" className="spin" />) : ''}
      <RubikText style={this.style.txtBtnBorda}>{this.props.title}</RubikText>
    </TouchableHighlight>
  }

  style = {
    btnBorda: {
      alignSelf: 'center',
      marginTop: 10,
      padding: 6,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'solid'
    },
    txtBtnBorda: {
      color: 'white',
      textTransform: 'uppercase'
    }
  }
}

export default ButtonBorder;