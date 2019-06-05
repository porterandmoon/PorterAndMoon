import React from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import getSearchData from '../../data/PortAndMoonFactory/Search';


class SearchBar extends React.Component {
    state = {
        query: '',
        data: [],
        searchString:[]
    }

    handleChange(event) {
        this.setState({query: event.target.value.toLowerCase()});
      }

    executeSearch = () => {
        const input = this.state.query;
        getSearchData(input)
        .then((responseData) => {
            this.setState({ data: responseData });
        })
        .catch(err => console.error('error with search GET', err))
    }
    

    render() {
        return (
            <div className="searchForm">
                <InputGroup>
                    <Input placeholder="Search..." />
                    <Input className ="input" value={this.state.query} onChange={this.handleChange} placeholder="Search..." />
                    <Button className="searchBtn" onClick={this.executeSearch}>Go</Button>
                </InputGroup>
            </div>
        );
    }
}

export default SearchBar;