import React, { Component } from 'react';

class LaughingSmiling extends Component {

  render() {
    return <div {...this.props} style={Object.assign({},this.style.fontRubik,this.props.style)}>
        {this.props.bold ? 
        (<b style={{display:'inline'}}>{this.props.children}</b>) :
        (<span style={{display:'inline'}}>{this.props.children}</span>)}
    </div>
  }

  style = {
    fontRubik: {
      fontFamily: 'Laughing And Smiling',
      flexDirection: 'row',
      fontSize:20
    }
  }
}

export default LaughingSmiling;