import React, { Component } from 'react';

class Breadcrumb extends Component {

  render() {
    return <div style={this.style.container}>
        {this.props.children}
    </div>
  }

  style = {
    container: {
      flexDirection: 'row',
      paddingTop: 20,
      paddingLeft: 20,
      color: 'white',
      alignSelf: 'flex-start',
      fontSize: 14
    }
  }
}

export default Breadcrumb;