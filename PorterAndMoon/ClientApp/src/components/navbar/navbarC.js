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
import navbarData from '../../data/PortAndMoonFactory/navbarData';
import 'firebase/auth';
import './navbarC.scss';
import logo from '../../images/moon.png';

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

  linkClicked = (event) => {
    switch (event.target.id) {
      case 'homeLink' : this.props.historyPusher('/homel'); break
      case 'freightLink' : this.props.historyPusher('/freightl'); break
      case 'passengerLink' : this.props.historyPusher('/passengerl'); break
      case 'mercuryLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+mercury')
        : this.props.historyPusher('/passengerl+mercury'); break
      case 'venusLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+venus')
        : this.props.historyPusher('/passengerl+venus'); break
      case 'earthLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+earth')
        : this.props.historyPusher('/passengerl+earth'); break
      case 'moonLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+moon')
        : this.props.historyPusher('/passengerl+moon'); break
      case 'marsLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+mars')
        : this.props.historyPusher('/passengerl+mars'); break
      case 'europaLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+europa')
        : this.props.historyPusher('/passengerl+europa'); break
      case 'ioLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+io')
        : this.props.historyPusher('/passengerl+io'); break
      case 'ganymedeLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+ganymede')
        : this.props.historyPusher('/passengerl+ganymede'); break
      case 'callistoLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+callisto')
        : this.props.historyPusher('/passengerl+callisto'); break
      case 'titanLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+titan')
        : this.props.historyPusher('/passengerl+titan'); break
      case 'rheaLink' : this.state.destinationMenuF ? this.props.historyPusher('/freightl+rhea')
        : this.props.historyPusher('/passengerl+rhea'); break
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
              <NavLink onMouseEnter={this.destinationF} onMouseLeave={this.destinationFOut} onClick={this.linkClicked} className={this.state.destinationMenuF ? 'hovered destinationItem' : 'destinationItem'} id='freightLink'>Freight</NavLink>
              <NavLink onMouseEnter={this.destinationP} onMouseLeave={this.destinationPOut} onClick={this.linkClicked} className={this.state.destinationMenuP ? 'hovered destinationItem' : 'destinationItem'} id='passengerLink'>Passenger</NavLink>
            </div>;
  }

  destinationMenu = (menuF) => {
    return <div id='destinationMenu' onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut}>
      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='mercuryLink'>Mercury
        {menuF ? ` (${this.state.freightRocketInfo.Mercury != null ? this.state.freightRocketInfo.Mercury.length : ''})`
          : ` (${this.state.passengerRocketInfo.Mercury != null ? this.state.passengerRocketInfo.Mercury.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='venusLink'>Venus
        {menuF ? ` (${this.state.freightRocketInfo.Venus != null ? this.state.freightRocketInfo.Venus.length : ''})`
          : ` (${this.state.passengerRocketInfo.Venus != null ? this.state.passengerRocketInfo.Venus.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='earthLink'>Earth
        {menuF ? ` (${this.state.freightRocketInfo.Earth != null ? this.state.freightRocketInfo.Earth.length : ''})`
          : ` (${this.state.passengerRocketInfo.Earth != null ? this.state.passengerRocketInfo.Earth.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='moonLink'>Moon
        {menuF ? ` (${this.state.freightRocketInfo.Moon != null ? this.state.freightRocketInfo.Moon.length : ''})`
          : ` (${this.state.passengerRocketInfo.Moon != null ? this.state.passengerRocketInfo.Moon.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='marsLink'>Mars 
          {menuF ? ` (${this.state.freightRocketInfo.Mars != null ? this.state.freightRocketInfo.Mars.length : ''})`
          : ` (${this.state.passengerRocketInfo.Mars != null ? this.state.passengerRocketInfo.Mars.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='europaLink'>Europa
        {menuF ? ` (${this.state.freightRocketInfo.Europa != null ? this.state.freightRocketInfo.Europa.length : ''})`
          : ` (${this.state.passengerRocketInfo.Europa != null ? this.state.passengerRocketInfo.Europa.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='ganymedeLink'>Ganymede
        {menuF ? ` (${this.state.freightRocketInfo.Ganymede != null ? this.state.freightRocketInfo.Ganymede.length : ''})`
          : ` (${this.state.passengerRocketInfo.Ganymede != null ? this.state.passengerRocketInfo.Ganymede.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='ioLink'>Io
        {menuF ? ` (${this.state.freightRocketInfo.Io != null ? this.state.freightRocketInfo.Io.length : ''})`
          : ` (${this.state.passengerRocketInfo.Io != null ? this.state.passengerRocketInfo.Io.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='callistoLink'>Callisto
        {menuF ? ` (${this.state.freightRocketInfo.Callisto != null ? this.state.freightRocketInfo.Callisto.length : ''})`
          : ` (${this.state.passengerRocketInfo.Callisto != null ? this.state.passengerRocketInfo.Callisto.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='titanLink'>Titan
        {menuF ? ` (${this.state.freightRocketInfo.Titan != null ? this.state.freightRocketInfo.Titan.length : ''})`
          : ` (${this.state.passengerRocketInfo.Titan != null ? this.state.passengerRocketInfo.Titan.length : ''})`}</NavLink>

      <NavLink className='destinationItem' onMouseEnter={menuF ? this.destinationF : this.destinationP}
        onMouseLeave={menuF ? this.destinationFOut : this.destinationPOut} onClick={this.linkClicked} id='rheaLink'>Rhea
        {menuF ? ` (${this.state.freightRocketInfo.Rhea != null ? this.state.freightRocketInfo.Rhea.length : ''})`
          : ` (${this.state.passengerRocketInfo.Rhea != null ? this.state.passengerRocketInfo.Rhea.length : ''})`}</NavLink>
    </div>
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
                <div>
                <NavLink onMouseEnter={this.dropDown} onMouseLeave={this.dropDownOut} className={this.state.rocketMenu ? 'hovered' : null} id='rocketLink'>
                  <i className="fas fa-home"></i> Find A Rocket
                <div id='dropdownMenuDiv'>
                {this.state.destinationMenuF ? this.destinationMenu(true) : null}
                {this.state.destinationMenuP ? this.destinationMenu(false) : null}  
                {this.state.rocketMenu ? this.rocketMenu() : null}
                </div>
                </NavLink>
                </div>
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

export default navbarC;