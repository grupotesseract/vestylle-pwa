import React, { Component } from 'react';

class ImageBackground extends Component {

  render() {
    return <div style={Object.assign({},this.style.imgbg, this.props.style)}>
        {this.props.children}
    </div>
  }

  style = {
      imgbg: {
          backgroundImage: 'url('+this.props.source+')',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
      }
  }
}

export default ImageBackground;