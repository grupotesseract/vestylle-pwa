import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import View from './View';
import RubikText from './RubikText';
import TouchableHighlight from "../ui/TouchableHighlight";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserConsumer } from '../UserContext';
import { FacebookShareButton } from 'react-share'
import { IoMdShare } from 'react-icons/io';
class LikeBtn extends Component {

  state={
    redirectTo : null
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo}/>
    }
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

    if(!this.props.isAuth) {
      this.setState({
        redirectTo: "/cadastro"
      })
      return
    }
    this.props.toggleDesejo(idProduto)
    console.log(idProduto)
  }
}

class Produto extends Component {

  render() {
    return <div style={{ overflow: 'visible', position: 'relative', alignSelf: 'center', width: '100%'}}>
        <Link 
          to={"/produtos/"+this.props.id}>
        {Number(this.props.porcentagem_off) > 0 &&
        <View style={{
            backgroundColor: '#e20f17',
            position: 'absolute',
            top: -3,
            right: 45,
            padding: 10,
            paddingBottom: 0
          }}
          className="bandeirola">
            <RubikText bold={true} 
              style={{
                fontSize:22,
                color: 'white'
              }}>{this.props.porcentagem_off}%</RubikText>
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
        }} 
          alt={this.props.id}
          className="img-slider"
          src={this.props.img}/>
        </Link>
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
                textAlign: 'left',
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
          <FacebookShareButton 
          style={{alignSelf: 'center'}}
          url={new URL('/', window.location).href + "/produtos/" + this.props.id}>
            <IoMdShare
              size={32}
              style={{color: '#585756', cursor: 'pointer'}}
            />
          </FacebookShareButton>
          <UserConsumer>
            {({toggleDesejo, isAuth}) => (
              <LikeBtn
                toggleDesejo={toggleDesejo}
                id={this.props.id}
                liked={this.props.liked}
                isAuth={isAuth}
              />
            )}
          </UserConsumer>
        </View>
    </div>
  }
}

export default Produto;