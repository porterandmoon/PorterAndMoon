import React from 'react';
import {
  Modal, ModalHeader, ModalBody, Button
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import './login.scss';

class login extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    error: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  //Updates the relevant state whenever a form field is edited.
  updateField = (event) => {
    const val = event.target.value;
    switch(event.target.id) {
      case 'emailInputLogin' : this.setState({ email : val }); break;
      case 'passwordInputLogin' : this.setState({ password : val }); break; 
      default : break;
    }
  }

  //Runs the form validator and then if it passes logs the user in through firebase and reroutes them to the correct page.
  loginUser = () => {
    this.setState({ error: false });
    this.validate();
    if (!this.state.error) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.historyPusher();
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          this.setState({ error: 'Incorrect password entered' });
        }
      });
    }  
  }

  //If user is on registration page routes them to the home page, otherwise routes them back to the logged in version of current page.
  historyPusher = () => {
    if (this.props.location === 'register') {
      this.props.history.push('/homel');
    } else {
      this.props.history.push(`/${this.props.location}l`);
    }
  }

  validate = () => {
    if (this.state.email === '') {
      this.setState({ error: 'No email entered' });
    } else if (this.state.password === '') {
      this.setState({ error: 'No password entered' });
    } else if (this.state.password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters' });
    }
  }

  render() {
    return(
      <div className='login'>
        <Button onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='loginM' toggle={this.toggle}>
            Login to Porter And Moon
          </ModalHeader>
          <ModalBody className='loginM'>
            <div>
              <form>
                <div className="form-group">
                  <label htmlFor="emailInputLogin">Email</label>
                  <input type="email" className="form-control" id="emailInputLogin" placeholder="Enter email" onChange={this.updateField}/>
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInputLogin">Password</label>
                  <input type="password" className="form-control" id="passwordInputLogin" placeholder="Enter password" onChange={this.updateField}/>
                </div>
              </form>
              <Button onClick={this.loginUser}>Login</Button>
              <p className='errorMsg'>{this.state.error ? this.state.error : null}</p>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default login;