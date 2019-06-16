import React from 'react';
import SearchDetail from '../SearchBar/searchDetail'; 


class SearchResults extends React.Component {


    render() {
        const { searchData } = this.props;
        const listItems = searchData.map((searchData) =>
        <SearchDetail 
        searchData={searchData}
        key={searchData.id}/>)
        return(
            <div className="resultsContainer">
               {listItems}
            </div>

        );
    }
}

export default SearchResults;