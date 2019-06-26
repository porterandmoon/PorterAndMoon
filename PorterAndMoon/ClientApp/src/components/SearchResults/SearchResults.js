import React from 'react';
import SearchDetail from '../SearchBar/searchDetail'; 
import './SearchResults.scss';


class SearchResults extends React.Component {


    render() {
        const { searchData } = this.props;
        const listItems = searchData.map((searchData) =>
        <SearchDetail 
        searchData={searchData}
        key={searchData.id}/>)
        return(
            <div className="resultsContainer">
                <h1>Search results...</h1>
               {listItems}
            </div>

        );
    }
}

export default SearchResults;