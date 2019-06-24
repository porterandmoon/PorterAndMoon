import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

 class menu extends React.Component {
  state = {
      dropdownOpen: false,
      selection: 'Moon'
    }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  select = (event) => {
    const val = event.target.value;
    this.setState({ selection: val }, () => {
      this.props.menuSelector(this.state.selection);
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='addFlightMenu'>
        <DropdownToggle caret>
          {this.state.selection}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value='Mercury' onClick={this.select}>Mercury</DropdownItem>
          <DropdownItem value='Venus' onClick={this.select}>Venus</DropdownItem>
          <DropdownItem value='Earth' onClick={this.select}>Earth</DropdownItem>
          <DropdownItem value='Moon' onClick={this.select}>Moon</DropdownItem>
          <DropdownItem value='Mars' onClick={this.select}>Mars</DropdownItem>
          <DropdownItem value='Europa' onClick={this.select}>Europa</DropdownItem>
          <DropdownItem value='Ganymede' onClick={this.select}>Ganymede</DropdownItem>
          <DropdownItem value='Io' onClick={this.select}>Io</DropdownItem>
          <DropdownItem value='Callisto' onClick={this.select}>Callisto</DropdownItem>
          <DropdownItem value='Titan' onClick={this.select}>Titan</DropdownItem>
          <DropdownItem value='Rhea' onClick={this.select}>Rhea</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default menu;