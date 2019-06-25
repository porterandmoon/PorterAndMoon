import React from 'react';

class SinglePaymentType extends React.Component {

  render(){
    var x = Object.keys(this.props.paymentInfo);
    var y = [];

    for(var i = 0; i < x.length; i++){
      if(x[i] !== undefined && x[i] !== null){
        var z = x[i];
        y.push(<div>{z}: {this.props.paymentInfo[z]}</div>)
      }
    }

    return(
      <div>
        {y}
      </div>
    );
  }
}

export default SinglePaymentType;