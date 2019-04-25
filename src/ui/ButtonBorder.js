import React, { Component } from 'react';
import RubikText from './RubikText';
import TouchableHighlight from './TouchableHighlight';
import { FaSpinner } from 'react-icons/fa';

class ButtonBorder extends Component {

  state = {
    disabled: false
  }

  componentDidMount() {
    this.setState({disabled: this.props.disabled})
  }

  componentWillReceiveProps(props) {
    let disabled = props.disabled;
    if(props.loading) {
      disabled = true
    }
    this.setState({disabled})
  }

  render() {
    return <TouchableHighlight
      submit={this.props.submit} 
      onPress={this.state.disabled ? null : this.props.onPress}
      style={Object.assign({}, this.style.btnBorda, this.state.disabled ? this.style.disabled : {}) }>
      {this.props.loading ? (<FaSpinner color="white" className="spin" />) : ''}
      <RubikText style={Object.assign({}, this.style.txtBtnBorda, this.state.disabled ? this.style.disabled : {}) }>{this.props.title}</RubikText>
    </TouchableHighlight>
  }

  style = {
    disabled: {
      cursor: 'default',
      borderColor:'grey',
      color: 'grey'
    },
    btnBorda: {
      cursor: 'pointer',
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