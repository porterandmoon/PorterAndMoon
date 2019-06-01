import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
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

  updateField = (event) => {
    const val = event.target.value;
    switch(event.target.id) {
      case 'emailInputLogin' : this.setState({ email : val }); break;
      case 'passwordInputLogin' : this.setState({ password : val }); break; 
    }
  }

  loginUser = () => {
    this.setState({ error: false });
    this.validate();
    if (!this.state.error) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          this.setState({ error: 'Incorrect password entered' });
        }
      });
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
        <button onClick={this.toggle}>Login</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Login
          </ModalHeader>
          <ModalBody>
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
              <button onClick={this.loginUser}>Login</button>
              <p className='errorMsg'>{this.state.error ? this.state.error : null}</p>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default login;