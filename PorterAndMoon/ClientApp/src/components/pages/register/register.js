import React from 'react';
import registerData from '../../../data/FirebaseFactory/registerData';
import './register.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import Login from '../../login/login'
import logo from '../../../images/rocket3.png';
import logoText from '../../../images/logotext.png';
import { Button } from 'reactstrap';

class register extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    registerError: false
  }

  updateField = (event) => {
    const val = event.target.value;
    switch(event.target.id) {
      case 'usernameInput' : this.setState({ username : val }); break;
      case 'emailInput' : this.setState({ email : val }); break;
      case 'firstNameInput' : this.setState({ firstName : val }); break;
      case 'lastNameInput' : this.setState({ lastName : val }); break;
      case 'passwordInput' : this.setState({ password : val }); break; 
      default : break;
    }
  }

  addUser = () => {
    this.setState({ registerError: false });
    this.validate();
    if (!this.state.registerError) {
      registerData.createUser(this.state.email, this.state.password)
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        registerData.createUserInDB(this.state.firstName, this.state.lastName, this.state.username, uid)
          .then(() => {
            this.props.history.push('/homel');
          });
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.setState({ registerError: 'Email already registered.  Use another email address' });
        }
      });
    }
  }

  validate = () => {
    if (this.state.userName === '') {
      this.setState({ registerError: 'No username entered' });
    } else if (this.state.password === '') {
      this.setState({ registerError: 'No password entered' });
    } else if (this.state.password.length < 6) {
      this.setState({ registerError: 'Password must be at least 6 characters' });
    } else if (this.state.email === '') {
      this.setState({ registerError: 'No email entered' });
    } else if (this.state.firstName === '') {
      this.setState({ registerError: 'No first name entered' });
    } else if (this.state.lastName === '') {
      this.setState({ registerError: 'No last name entered' });
    } 
  }

  render() {
    return (
      <div className="register">
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='logoDiv'>
                <div className='logoTextDiv'>
                  <img src={logoText} className='logoText'/>
                  <p>We've got space... in space</p>
                </div>              
                <img src={logo} className='logo'/>
              </div> 
            </div>
            <div className='col-4 spacer'></div>
            <div className='loginDiv col'>
              <p className='loginP'>Already a member?</p>
              <Login location='register'/>
            </div>   
          </div>
        </div>        
        <div className="jumbotron registerMain">
          <h3 className="registerTitle">Register a new Porter And Moon account.</h3>
          <form className='registerForm'>
              <div className="form-group registerFormGroup">
                <label htmlFor="usernameInput">Username</label>
                <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" onChange={this.updateField}/>
              </div>
              <div className="form-group registerFormGroup">
                <label htmlFor="emailInput">Email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter email" onChange={this.updateField}/>
              </div>
              <div className="form-group registerFormGroup">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" className="form-control" id="passwordInput" placeholder="Enter password" onChange={this.updateField}/>
              </div>
              <div className="form-group registerFormGroup">
                <label htmlFor="firstNameInput">First Name</label>
                <input type="text" className="form-control" id="firstNameInput" placeholder="Enter first name" onChange={this.updateField}/>
              </div>
              <div className="form-group registerFormGroup">
                <label htmlFor="lastNameInput">Last Name</label>
                <input type="text" className="form-control" id="lastNameInput" placeholder="Enter last name" onChange={this.updateField}/>
              </div>
          </form>
          <p className='errorMsg'>{this.state.registerError ? this.state.registerError : null}</p>
          <Button onClick={this.addUser} className='registerButton'>Register</Button>
        </div>
      </div>
    );
  }
}

export default register;