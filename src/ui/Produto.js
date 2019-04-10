import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import View from './View';
import RubikText from './RubikText';
import TouchableHighlight from "../ui/TouchableHighlight";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class Produto extends Component {

  render() {
    return <div style={{ alignSelf: 'center', overflow:'hidden', width: '100%'}}>
        <img 
          style={{
            objectFit:'cover', 
            height: '100%',
            borderWidth: 2,
            borderColor: '#bdbabc',
            borderRadius: 10
        }} 
          alt={this.props.id}
          className="img-slider"
          src={"http:"+this.props.img}/>
        <View style={{
          flexDirection: 'row'
        }}>
          <Link 
            to={"/produtos/"+this.props.id}
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              alignItems:'flex-start',
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            <RubikText 
              bold={true}
              style={{
                color: '#585756',
                textDecorationLine: 'underline',
              }}
            >{this.props.titulo.toUpperCase()}</RubikText>
            <RubikText style={{
              color: '#585756',
              fontSize:14}}
            >
              {this.props.subtitulo}
            </RubikText>
          </Link>
          <TouchableHighlight
          onPress={() => this.props.likeCallback(this.props.id)}
          style={{
            flexGrow:0
          }}>
            {this.props.liked ? (
              <FaHeart
                size={32}
                style={{color: '#585756'}}
              />
            ) : (
              <FaRegHeart
                size={32}
                style={{color: '#585756'}}
              />
            )}
          </TouchableHighlight>
        </View>
    </div>
  }
}

export default Produto;