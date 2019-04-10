import React, { Component } from 'react';

class View extends Component {

  render() {
    return <div {...this.props}>
        {this.props.children}
    </div>
  }
}

export default View;