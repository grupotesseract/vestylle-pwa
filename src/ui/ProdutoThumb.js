import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import View from './View';
import RubikText from './RubikText';

class ProdutoThumb extends Component {

  render() {
    return <div 
        style={{ 
          overflow: 'visible', 
          position: 'relative', 
          alignSelf: 'center', 
          margin: 1,
          marginTop: 10,
          width: '100%'
        }}>
        {Number(this.props.porcentagem_off) > 0 &&
        <View style={{
            backgroundColor: '#e20f17',
            position: 'absolute',
            top: -2,
            right: 15,
            padding: 7,
            paddingBottom: 0
          }}
          className="bandeirola">
            <RubikText bold={true} 
              style={{
                fontSize:18,
                color: 'white'
              }}>{this.props.porcentagem_off}%</RubikText>
            <RubikText bold={true} 
              style={{
                fontSize:16,
                color: 'white',
                flexDirection: 'column',
                marginTop: -2
              }}>OFF</RubikText>
        </View>
        }
        <Link 
          to={"/produtos/"+this.props.id}
          style={{overflow: 'hidden'}}
          >
          <img 
            style={{
              objectFit:'cover', 
              height: '100%',
              borderWidth: 2,
              borderColor: '#bdbabc',
            }} 
            alt={this.props.id}
            className="img-thumb"
            src={this.props.img}/>
          
        </Link>
    </div>
  }
}

export default ProdutoThumb;