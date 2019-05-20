import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import View from './View';
import RubikText from './RubikText';
import TouchableHighlight from "../ui/TouchableHighlight";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserConsumer } from '../UserContext';

class LikeBtn extends Component {

  render() {
    return <TouchableHighlight
    onPress={this.likeProduto}
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
  }

  likeProduto = () => {
    const idProduto = this.props.id
    this.props.toggleDesejo(idProduto)
    console.log(idProduto)
  }
}

class Produto extends Component {

  render() {
    return <div style={{ overflow: 'visible', position: 'relative', alignSelf: 'center', width: '100%'}}>
        {(this.props.porcentagem_off) &&
        <View style={{
            backgroundColor: '#e20f17',
            position: 'absolute',
            top: -3,
            right: 30,
            padding: 10,
            paddingBottom: 0
          }}
          className="bandeirola">
            <RubikText bold={true} 
              style={{
                fontSize:22,
                color: 'white'
              }}>10%</RubikText>
            <RubikText bold={true} 
              style={{
                fontSize:20,
                color: 'white',
                flexDirection: 'column',
                marginTop: -2
              }}>OFF</RubikText>
        </View>
        }
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
          src={this.props.img}/>
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
              alignItems: 'flex-start',
              textAlign: 'left',
              fontSize:14}}
            >
              {this.props.subtitulo}
            </RubikText>
          </Link>
          <UserConsumer>
            {({toggleDesejo}) => (
              <LikeBtn
                likeCallback={this.props.likeCallback}
                toggleDesejo={toggleDesejo}
                id={this.props.id}
                liked={this.props.liked}
              />
            )}
          </UserConsumer>
        </View>
    </div>
  }
}

export default Produto;