import React from 'react';

class SinglePayment extends React.Component {
    render(){
        const { payment } = this.props;

        const addButtons = () => {
            const buttons = <div>
                <button className="btn btn-danger">X</button>
                <button className="btn btn-warning"><i class="far fa-edit"></i></button>
                </div>
            return buttons;
        }
        return(
            <div className="singlePayment">
                <h5>{payment.type}</h5>
                <p>{payment.name}</p>
                <p>{payment.bankAccountNumber}</p>
                <p>{payment.cardNumber}</p>
                {addButtons}
            </div>
        )
    }
}

export default SinglePayment;