import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './menu.scss';

class menu extends React.Component {
  state = {
    dropdownOpen: false,
    selection: 'Earth'
  }

  componentDidMount() {
    this.setState({ selection: this.props.default });
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  select = (event) => {
    const val = event.target.value;
    this.setState({ selection: val });
    this.props.selector(val);
  }

  render() {
    return(
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        {this.state.selection}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.select} value='Mercury'>Mercury</DropdownItem>
          <DropdownItem onClick={this.select} value='Venus'>Venus</DropdownItem>
          <DropdownItem onClick={this.select} value='Earth'>Earth</DropdownItem>
          <DropdownItem onClick={this.select} value='Moon'>Moon</DropdownItem>
          <DropdownItem onClick={this.select} value='Mars'>Mars</DropdownItem>
          <DropdownItem onClick={this.select} value='Europa'>Europa</DropdownItem>
          <DropdownItem onClick={this.select} value='Ganymede'>Ganymede</DropdownItem>
          <DropdownItem onClick={this.select} value='Io'>Io</DropdownItem>
          <DropdownItem onClick={this.select} value='Callisto'>Callisto</DropdownItem>
          <DropdownItem onClick={this.select} value='Titan'>Titan</DropdownItem>
          <DropdownItem onClick={this.select} value='Rhea'>Rhea</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default menu;