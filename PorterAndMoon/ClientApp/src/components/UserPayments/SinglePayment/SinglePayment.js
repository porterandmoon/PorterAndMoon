import React from 'react';
import './SinglePayment.scss';

class SinglePayment extends React.Component {
    deleteEvent = (e) => {
        e.preventDefault();
        const { deletePayment, payment } = this.props;
        deletePayment(payment.id);
    }

    render(){
        const { payment } = this.props;

        const addButtons = () => {
            const buttons = <div>
                <button className="btn btn-danger" onClick={this.deleteEvent}>X</button>
                <button className="btn btn-warning"><i className="far fa-edit"></i></button>
                </div>
            return buttons;
        }
        return(
            <div className="singlePayment">
                <h5>{payment.type}</h5>
                <p>{payment.name}</p>
                <p>{payment.bankAccountNumber}</p>
                <p>{payment.cardNumber}</p>
                {addButtons()}
            </div>
        )
    }
}

export default SinglePayment;