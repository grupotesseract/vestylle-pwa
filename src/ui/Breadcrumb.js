import React, { Component } from 'react';

class Breadcrumb extends Component {

  render() {
    return <div style={this.style.container}>
        {this.props.children}
    </div>
  }

  style = {
    container: {
      paddingTop: 20,
      paddingLeft: 20,
      color: 'white'
    }
  }
}

export default Breadcrumb;