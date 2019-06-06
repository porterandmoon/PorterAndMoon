import React from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import getSearchData from '../../data/PortAndMoonFactory/Search';


class SearchBar extends React.Component {
    state = {
        value: '',
        data: [],
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    executeSearch = () => {
        const input = this.state.query;
        getSearchData(input)
        .then((responseData) => {
            this.setState({ data: responseData });
        })
        .catch(err => console.error('error with search GET', err))
    }

    // componentWillMount(){
    //     this.executeSearch();
    // }
    

    render() {

        return (
            <div className="searchForm">
                <InputGroup>
                    <Input className="input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                    <Button className="searchBtn" onClick={this.executeSearch}>Go</Button>
                </InputGroup>
            </div>
        );
    }
}

export default SearchBar;