import React from 'react';
import registerData from '../../../data/FirebaseFactory/registerData';
import './register.scss';

class register extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: ""
  }

  render() {
    return (
      <div className="register">
        <div className="jumbotron">
          <h1 className="display-4">Register a new account.</h1>
          <form>
              <div className="form-group">
                <label htmlFor="usernameInput">Email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="usernameInput">First Name</label>
                <input type="text" className="form-control" id="firstNameInput" placeholder="Enter first name"/>
              </div>
              <div className="form-group">
                <label htmlFor="usernameInput">Last Name</label>
                <input type="email" className="form-control" id="lastNameInput" placeholder="Enter last name"/>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default register;