import React, { Component } from 'react';

class RubikText extends Component {

  render() {
    return <div style={Object.assign({},this.style.fontRubik,this.props.style)}>
        {this.props.bold ? 
        (<b style={{display:'inline'}}>{this.props.children}</b>) :
        (<span style={{display:'inline'}}>{this.props.children}</span>)}
    </div>
  }

  style = {
    fontRubik: {
      fontFamily: 'Rubik',
      flexDirection: 'row'
    }
  }
}

export default RubikText;