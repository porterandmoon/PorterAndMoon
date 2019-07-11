import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';
import SinglePayment from './SinglePayment/SinglePayment';

class UserPayments extends React.Component {
    state = {
        userPayments: null
    }

    // deletePayment = (paymentId) => {
    //     Payment.deletePaymentType(paymentId)
    // }

    componentDidMount() {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((res) => {
            const userPayments = res.data;
            this.setState({ userPayments })
        })
        .catch((err) => console.error(err));
    }

    // paymentComponents = () => {
    // const payments = this.state.userPayments;
    // if(this.state.userPayments !== null) {
    //    payments.map(payment => (
    //         <SinglePayment
    //         payment={payment}
    //         key={payment.id}
    //         />
    //     ));
    //     }
    // }

    buildPayment = () => {
        if (this.state.userPayments !== null) {
            console.log(this.state.userPayments)
            const paymentArray = []
            Object.keys(this.state.userPayments).forEach((paymentId) => {
                const payment = this.state.userPayments[paymentId];
                paymentArray.push(
                    <SinglePayment
                    payment={payment}
                    key={payment.id}
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
                                <h3>Your Saved Payment Methods</h3>
                                {this.buildPayment()}
                            </div>
                            <div className="cardForm">
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