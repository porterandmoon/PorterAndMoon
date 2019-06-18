import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import navbarData from '../../data/PortAndMoonFactory/navbarData';
import 'firebase/auth';
import './navbarC.scss';
import logo from '../../images/moon.png';

import SearchBar from '../SearchBar/SearchBar';

class navbarC extends React.Component {
  state = {
    rocketMenu: false,
    destinationMenuF: false,
    destinationMenuP: false,
    freightRocketInfo: null,
    passengerRocketInfo: null
  }

  componentDidMount() {
    navbarData.getAvailableRockets(1)
      .then((rockets) => {
        this.setState({ freightRocketInfo: rockets });
      });
    navbarData.getAvailableRockets(2)
      .then((rockets) => {
        this.setState({ passengerRocketInfo: rockets });
      });
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

  destinationF = (event) => {
    this.setState({ destinationMenuF: true });
    const link = event.target;
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  destinationP = (event) => {
    this.setState({ destinationMenuP: true });
    const link = event.target;
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  destinationFOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    }
    this.setState({ destinationMenuF: false });
  }

  destinationPOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    }
    this.setState({ destinationMenuP: false });
  }

  rocketMenu = () => {
    return <div id='rocketMenu' onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut}>
              <NavLink tag={RRNavLink} to='/freightl' onMouseEnter={this.destinationF} onMouseLeave={this.destinationFOut} className={this.state.destinationMenuF ? 'hovered destinationItem' : 'destinationItem'} id='freightLink'>Freight</NavLink>
              <NavLink tag={RRNavLink} to='/passengerl' onMouseEnter={this.destinationP} onMouseLeave={this.destinationPOut} className={this.state.destinationMenuP ? 'hovered destinationItem' : 'destinationItem'} id='passengerLink'>Passenger</NavLink>
            </div>;
  }

  destinationMenu = (menuF) => {
    return <div id='destinationMenu' onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut}>
      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+mercury`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Mercury
        {menuF ? ` (${this.state.freightRocketInfo.Mercury != null ? this.state.freightRocketInfo.Mercury.length : ''})`
          : ` (${this.state.passengerRocketInfo.Mercury != null ? this.state.passengerRocketInfo.Mercury.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+venus`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Venus
        {menuF ? ` (${this.state.freightRocketInfo.Venus != null ? this.state.freightRocketInfo.Venus.length : ''})`
          : ` (${this.state.passengerRocketInfo.Venus != null ? this.state.passengerRocketInfo.Venus.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+earth`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Earth
        {menuF ? ` (${this.state.freightRocketInfo.Earth != null ? this.state.freightRocketInfo.Earth.length : ''})`
          : ` (${this.state.passengerRocketInfo.Earth != null ? this.state.passengerRocketInfo.Earth.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+moon`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Moon
        {menuF ? ` (${this.state.freightRocketInfo.Moon != null ? this.state.freightRocketInfo.Moon.length : ''})`
          : ` (${this.state.passengerRocketInfo.Moon != null ? this.state.passengerRocketInfo.Moon.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+mars`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Mars 
          {menuF ? ` (${this.state.freightRocketInfo.Mars != null ? this.state.freightRocketInfo.Mars.length : ''})`
          : ` (${this.state.passengerRocketInfo.Mars != null ? this.state.passengerRocketInfo.Mars.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+europa`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Europa
        {menuF ? ` (${this.state.freightRocketInfo.Europa != null ? this.state.freightRocketInfo.Europa.length : ''})`
          : ` (${this.state.passengerRocketInfo.Europa != null ? this.state.passengerRocketInfo.Europa.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+ganymede`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Ganymede
        {menuF ? ` (${this.state.freightRocketInfo.Ganymede != null ? this.state.freightRocketInfo.Ganymede.length : ''})`
          : ` (${this.state.passengerRocketInfo.Ganymede != null ? this.state.passengerRocketInfo.Ganymede.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+io`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Io
        {menuF ? ` (${this.state.freightRocketInfo.Io != null ? this.state.freightRocketInfo.Io.length : ''})`
          : ` (${this.state.passengerRocketInfo.Io != null ? this.state.passengerRocketInfo.Io.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+callisto`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Callisto
        {menuF ? ` (${this.state.freightRocketInfo.Callisto != null ? this.state.freightRocketInfo.Callisto.length : ''})`
          : ` (${this.state.passengerRocketInfo.Callisto != null ? this.state.passengerRocketInfo.Callisto.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+titan`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Titan
        {menuF ? ` (${this.state.freightRocketInfo.Titan != null ? this.state.freightRocketInfo.Titan.length : ''})`
          : ` (${this.state.passengerRocketInfo.Titan != null ? this.state.passengerRocketInfo.Titan.length : ''})`}</NavLink>

      <NavLink tag={RRNavLink} to={`/${menuF ? 'freightl' : 'passengerl'}+rhea`}
        className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut}>Rhea
        {menuF ? ` (${this.state.freightRocketInfo.Rhea != null ? this.state.freightRocketInfo.Rhea.length : ''})`
          : ` (${this.state.passengerRocketInfo.Rhea != null ? this.state.passengerRocketInfo.Rhea.length : ''})`}</NavLink>
    </div>
  }

  render() {
    const { searchData } = this.props;
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
              <SearchBar className="searchBar" searchData={searchData}/>
                <NavLink onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.linkClicked} id='homeLink'></NavLink>
                <NavLink tag={RRNavLink} to='/homel' onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>
                  <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink tag={RRNavLink} to="/profile" onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>User Info</NavLink>
                <NavLink tag={RRNavLink} to="/order-history" onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>Order History</NavLink>
                <NavLink tag={RRNavLink} to="/sellerhome" onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut}>Seller Dashboard</NavLink>
                <div>
                  <NavLink tag={RRNavLink} onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut} className={this.state.rocketMenu ? 'hovered' : null} id='rocketLink'>
                      Find A Rocket
                    <div id='dropdownMenuDiv'>
                    {this.state.destinationMenuF ? this.destinationMenu(true) : null}
                    {this.state.destinationMenuP ? this.destinationMenu(false) : null}  
                    {this.state.rocketMenu ? this.rocketMenu() : null}
                    </div>
                  </NavLink>
                </div>
                <NavLink tag={RRNavLink} onClick={this.logoutClicked}
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

export default navbarC;