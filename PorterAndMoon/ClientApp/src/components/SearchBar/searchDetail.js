import React from 'react';
import { Link } from 'react-router-dom';
import './searchDetails.scss';

class SearchDetail extends React.Component {
    renderSearch = () => {
        const { searchData } = this.props;
        console.log(searchData);
        if (searchData.username !== null) {
            return <div>
                <h3><Link to={`/seller/${searchData.id}`}>{searchData.username}</Link></h3>
                </div>
        } else if (searchData.title !== null ) {
            return <div>
                <h3><Link to={`/detail/${searchData.title}/?Id=${searchData.id}`}>{searchData.title}</Link></h3>
                </div>
        } else {
            return ''
        };   
    };
    render() {

        return (
            <div className="searchDetail">
                <div className="SearchContainer">
                    <div className="col">
                        {this.renderSearch()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchDetail;