import React from 'react';

class SearchDetail extends React.Component {
    render() {
        const { searchData } = this.props;

        const renderSearch = () => {
            if (searchData.username !== 'null') {
                return <h3>{searchData.username}</h3>
            }
            else {
                return (
                    <div className="col">
                        <h3>{searchData.title}</h3>
                        <p>{searchData.description}</p>
                        <p>{searchData.price}</p>
                        <p>{searchData.quantitiy}</p>
                    </div>
                );
            }
        }

            // const getSearchClass = () => {
            //     switch (this.props.searchParams) {
            //         case 'users':
            //             return 'usersSearchDetails';
            //         case 'products': 
            //             return 'productsSearchDetails';
            //         default:
            //             return '';
            //     }
            // }
        return (
            <div className="searchDetail">
                <div className="container">
                    <div className="col">
                        {renderSearch()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchDetail;