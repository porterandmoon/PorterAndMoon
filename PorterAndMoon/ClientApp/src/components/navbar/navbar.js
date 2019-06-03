import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'react';
import './navbar.scss';
import logo from '../../images/rocket3.png';

class navbar extends React.Component {

  hovered = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  hoveredOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    }
  }

  render() {
    return(
      <div className='navbar'>
<Navbar color="dark" dark expand="md">
          <NavbarBrand className='navTitle' href="/">
            <img src={logo} alt='logo' className='logo'/>
            Porter And Moon
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem className='navLinks'>
                <NavLink tag={RRNavLink} to='/home' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink onClick={this.logoutClicked}
                  onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default navbar;