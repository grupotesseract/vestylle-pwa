import React, { Component } from 'react';

class TextInput extends Component {

  render() {
    return <input 
        type={this.props.secureTextEntry ? "password" : "text"}
        style={Object.assign({},this.props.style)}
        value={this.props.value}
        onChange={(e) => this.props.onChangeText(e.target.value)}
        onBlur={this.props.onBlur}
    />
  }
}

export default TextInput;