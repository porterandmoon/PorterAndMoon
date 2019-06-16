import React from 'react';
import { InputGroup, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem , Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import getData from '../../data/PortAndMoonFactory/Search';
import './SearchBar.scss';


class SearchBar extends React.Component {
    state = {
        value: "",
        dropdownOpen: false,
        searchParams: "Search in"
    };
    
    //updates state of 'value' as text is changed by user
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ value: e.target.value });
    }

    // updates state of 'searchParams' as changed by clicking dropdown
    updateSearch = (e) => {
        if(e.target.id === 'users') {
            this.setState({searchParams : 'users'})
        } else if(e.target.id === 'products'){
            this.setState({searchParams : 'products'})
        }
    }

    //chooses which search function to run based on search params state
    chooseSearch = (e) => {
        const search = this.state.searchParams;
        switch(search) {
            case 'users' :  this.executeUserSearch(); break;
            case 'products' : this.executeProductsSearch(); break;
            default : break;
        }
    }
    
    executeUserSearch = () => {
    const input = this.state.value;
    getData.getSearchData(input)
    .then((responseData) => {
        this.props.searchData(responseData);
    })
    .catch(err => console.error('error with search GET', err))
    }
    

    executeProductsSearch = () => {
        const input = this.state.value;
        getData.getProductsSearchData(input)
        .then((responseData) => {
            this.props.searchData(responseData);
        })
        .catch(err => console.error('error with search GET', err))
    }

    // reactstrap added this to toggle if dropdown is open or closed
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render() {

        return (
            <div className="searchForm">
                <InputGroup>
                    <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.searchParams}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem id="users" onClick={this.updateSearch}>Search Users</DropdownItem>
                            <DropdownItem id="products" onClick={this.updateSearch}>Search Products</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                        <Input className="input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                        <Button className="btn"><NavLink to="/search-results"><i className="fas fa-search" onClick={this.chooseSearch}></i></NavLink></Button>
                </InputGroup>
            </div>
        );
    }
}

export default SearchBar;