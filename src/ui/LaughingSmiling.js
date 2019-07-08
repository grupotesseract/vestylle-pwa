import React, { Component } from 'react';

class LaughingSmiling extends Component {

  render() {
    return <div {...this.props} 
      className={(this.props.className || '') + " laughing-and-smiling"} 
      style={this.props.style}>
        {this.props.bold ? 
        (<b style={{display:'inline'}}>{this.props.children}</b>) :
        (<span style={{display:'inline'}}>{this.props.children}</span>)}
    </div>
  }
}

export default LaughingSmiling;