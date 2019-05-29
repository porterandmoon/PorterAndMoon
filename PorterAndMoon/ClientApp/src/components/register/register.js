import { Component } from React;
import registerData from '../../data/registerData';
import './register.scss';

class register extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: ""
  }

  render() {
    return (
      <Div className="register">
        <div class="jumbotron">
          <h1 class="display-4">Register a new account.</h1>
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
      </Div>
    );
  }
}