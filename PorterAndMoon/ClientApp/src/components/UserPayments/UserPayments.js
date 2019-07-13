import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';
import SinglePayment from './SinglePayment/SinglePayment';

const emptyPayment = {
        type: '',
        customerId: '',
        expirationDate: '',
        cardNumber: '',
        securityNumber: '',
        routingNumber: '',
        bankAccountNumber: '',
        name: '',
        payPalAuth: false
    }

class UserPayments extends React.Component {
    state = {
        userPayments: null,
        newPayment: emptyPayment,
    }

    //called to update saved payments after one is deleted or added
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

    formSubmit = (e) => {
        e.preventDefault();
        const { currentUser } = this.props
        const myPayment = { ...this.state.newPayment };
        myPayment.customerId = currentUser.id;
        this.formSubmitEvent(myPayment);
        this.setState({ newPayment: emptyPayment})
    }

    formSubmitEvent = (newPayment) => {
        Payment.addPayment(newPayment)
        .then(() => {
            this.refreshPayments();
        })
        .catch(err => console.error('error getting updated payments', err));
    }

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
        const { newPayment } = this.state; 

        const getName = () => {
            this.setState({ newPayment : document.getElementById("cardName").value });
          }
        
        const getNum = () => {
        this.setState({ paymentType: document.getElementById("cardNum").value });
        }

        const getCode = () => {
            this.setState({ paymentType: document.getElementById("securityNumber").value });
          }
        
        const getExp = () => {
            this.setState({ paymentType: document.getElementById("cardDate").value });
            }

        const getType = () => {
            this.setState({ paymentType: document.getElementById("exampleSelect").value });
            }
                
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
                                <Form className="user-payment-form" onSubmit={this.formSubmit}>
                                <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" id="cardName" placeholder="Name on card" value={newPayment.name} onChange={getName}/>
                                </FormGroup>
                                <FormGroup>
                                <Label>Card Number</Label>
                                <Input type="text"id="cardNum" placeholder="#" value={newPayment.cardNumber} onChange={getNum}/>
                                </FormGroup>
                                <FormGroup>
                                <Label>Security Number</Label>
                                <Input type="text"id="securityNumber" placeholder="#" value={newPayment.securityNumber} onChange={getCode}/>
                                </FormGroup>
                                <FormGroup>
                                <Label>Month/Year Expiration</Label>
                                <Input type="month"id="cardDate" placeholder="" value={newPayment.expirationDate} onChange={getExp}/>
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleSelect">Select Payment Type</Label>
                                <Input type="select" name="select" id="exampleSelect" value={newPayment.type} onChange={getType}>
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