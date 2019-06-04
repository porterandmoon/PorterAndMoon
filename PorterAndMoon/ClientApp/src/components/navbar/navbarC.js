import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbarC.scss';
import logo from '../../images/moon.png';

class navbarC extends React.Component {
  state = {
    rocketMenu: false,
  }

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

  logoutClicked = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  }

  linkClicked = (event) => {
    switch (event.target.id) {
      case 'homeLink' : this.props.historyPusher('/homel'); break
      case 'freightLink' : this.props.historyPusher('/freightl'); break
      case 'passengerLink' : this.props.historyPusher('/passengerl'); break
      default : break;
    }
  }

  dropDown = (event) => {
    this.setState({ rocketMenu: true });
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  dropDownOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    }
    this.setState({ rocketMenu: false });
  }

  rocketMenu = () => {
    return <div id='rocketMenu' onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut}>
              <NavLink onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.linkClicked} id='freightLink'>Freight</NavLink>
              <NavLink onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.linkClicked} id='passengerLink'>Passenger</NavLink>
            </div>;
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
                <NavLink onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.linkClicked} id='homeLink'>
                  <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut} id='rocketLink'>
                  <i className="fas fa-home"></i> Find A Rocket
                </NavLink>
                <NavLink onClick={this.logoutClicked}
                  onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        {this.state.rocketMenu ? this.rocketMenu() : null}
      </div>
    );
  }
}

export default navbarC;