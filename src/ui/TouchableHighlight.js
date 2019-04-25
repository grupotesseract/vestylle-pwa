import React, { Component } from 'react';

class TouchableHighlight extends Component {

  render() {
    return <button 
    type={this.props.submit ? "submit":"button"}
    style={this.props.style} 
    onClick={this.props.onPress}>
        {this.props.children}
    </button>
  }
}

export default TouchableHighlight;