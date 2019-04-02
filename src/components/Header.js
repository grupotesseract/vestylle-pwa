import React, { Component } from 'react';
import logo from '../assets/logofull.png';
import Menu from './Menu';
import { MdMenu as MenuIcon } from 'react-icons/md';


class Header extends Component {

    state = {
        showMenu: false
    }

    render() {
        return <div style={{flexDirection: 'row', alignSelf: 'stretch'}}>
            <div style={this.style.sideContent}></div>
            <img src={logo} style={this.style.logo} alt="logo" />
            <button 
                style={this.style.sideContent}
                onClick={this.toggleMenu}
            >
                <MenuIcon size={36}/>
            </button>
            
            <Menu 
                visible={this.state.showMenu}
                toggleMenu={this.toggleMenu}
            />
        </div>
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    style = {
        sideContent: {
            width: 55,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            flexGrow: 1,
            maxHeight: 50,
            padding: 10
        }
    }
}


export default Header;