import React from 'react';

class RefundInfo extends React.Component{
  render() {
    if(this.props.refunded){
      return <p>Refunded</p>
    }

    return(
      <button className="btn btn-info">Return?</button>
    );
  }
}

export default RefundInfo;