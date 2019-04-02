import React, { Component } from 'react';

class View extends Component {

  render() {
    return <div style={this.props.style}>
        {this.props.children}
    </div>
  }
}

export default View;