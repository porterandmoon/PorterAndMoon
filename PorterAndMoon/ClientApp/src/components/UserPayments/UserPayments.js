import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';
import SinglePayment from './SinglePayment/SinglePayment';

class UserPayments extends React.Component {
    state = {
        userPayments: null
    }

    //called to update saved payments after one is deleted
    refreshPayments = () => {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((res) => {
            const userPayments = res.data;
            this.setState({ userPayments })
        })
        .catch((err) => console.error(err));
    }

    deletePayment = (paymentId) => {
        Payment.deletePaymentType(paymentId)
        .then(() => {
            this.refreshPayments();
        })
        .catch(err => console.error('error getting updated payments', err));
    }

    //gets initial list of saved payments by userId
    componentDidMount() {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((res) => {
            const userPayments = res.data;
            this.setState({ userPayments })
        })
        .catch((err) => console.error(err));
    }

    buildPayment = () => {
        if (this.state.userPayments !== null) {
            const paymentArray = []
            Object.keys(this.state.userPayments).forEach((paymentId) => {
                const payment = this.state.userPayments[paymentId];
                paymentArray.push(
                    <SinglePayment
                    payment={payment}
                    key={payment.id}
                    deletePayment={this.deletePayment}
                    />);
                });
            return paymentArray
        }       
    }  


    render() {
            return (
                <div className="payments">
                    <div className="container">
                    <div className="row">
                            <div className="paymentsCard">
                                <h3 className="addPay">Your Saved Payment Methods</h3>
                                {this.buildPayment()}
                            </div>
                            <div className="cardForm">
                                <h3 className="addPay">Add a new payment method:</h3>
                                <Form className="user-payment-form">
                                <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" id="cardName" placeholder="Name on card" />
                                </FormGroup>
                                <FormGroup>
                                <Label>Card Number</Label>
                                <Input type="text"id="cardName" placeholder="#" />
                                </FormGroup>
                                <FormGroup>
                                <Label>Security Number</Label>
                                <Input type="text"id="securityNumber" placeholder="#" />
                                </FormGroup>
                                <FormGroup>
                                <Label>Month/Year Expiration</Label>
                                <Input type="month"id="cardDate" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleSelect">Select Payment Type</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Visa</option>
                                    <option>MasterCard</option>
                                    <option>American Express</option>
                                    <option>Paypal</option>
                                </Input>
                                </FormGroup>  
                                <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" />
                                    Make my preferred payment type
                                </Label>
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
}               

export default UserPayments;