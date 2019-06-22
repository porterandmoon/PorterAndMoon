import React from 'react';

class SearchDetail extends React.Component {
    renderSearch = () => {
        const { searchData } = this.props;
        if (searchData.username !== null) {
            return <h3>{searchData.username}</h3>
        } else if (searchData.title !== null ) {
            return <div>
                <h3>{searchData.title}</h3>
                <p>{searchData.description}</p>
                <p>{searchData.price}</p>
                <p>{searchData.quantitiy}</p>
                </div>
        } else {
            return ''
        };   
    };
    render() {

        return (
            <div className="searchDetail">
                <div className="container">
                    <div className="col">
                        {this.renderSearch()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchDetail;