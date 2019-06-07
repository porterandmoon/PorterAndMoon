import React from 'react';
import { InputGroup, Input, Button, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import getSearchData from '../../data/PortAndMoonFactory/Search';
import './SearchBar.scss';


class SearchBar extends React.Component {
    state = {
        value: "",
        data: [],
        dropdownOpen: false   
    };
    
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ value: e.target.value });
    }

    executeSearch = () => {
        const input = this.state.value;
        getSearchData(input)
        .then((responseData) => {
            this.setState({ data: responseData });
        })
        .catch(err => console.error('error with search GET', err))
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render() {

        return (
            <div className="searchForm">
                <InputGroup>
                    <Input className="input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                    <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                        <DropdownToggle caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.executeSearch}>Search Users</DropdownItem>
                            <DropdownItem onClick={this.executeSearch}>Search Products</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                </InputGroup>
            </div>
        );
    }
}

export default SearchBar;