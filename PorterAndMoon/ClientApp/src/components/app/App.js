import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import connection from '../../data/FirebaseFactory/connection';
import Register from '../pages/register/register';
import Profile from '../pages/Profile/Profile';
import Home from '../home/home';
import './app.scss';

const PublicRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === true
    ? (<Component { ...props } loginStatus={loginStatus}/>)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

 class App extends Component {
  state = {
    loginStatus: true,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loginStatus: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          loginStatus: true,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <PrivateRoute path='/' exact component={Register} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/profile' component={Profile} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/home' component={Home} loginStatus={this.state.loginStatus}/>
            <PublicRoute path='/register' exact component={Register} loginStatus={this.state.loginStatus}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;