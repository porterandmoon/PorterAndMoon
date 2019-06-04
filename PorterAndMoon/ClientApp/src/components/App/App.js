import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../../data/FirebaseFactory/connection';
import Register from '../register/register';
import Profile from '../Profile/Profile';
import Home from '../home/home';
import OrderHistory from '../OrderHistory/OrderHistory';
import './app.scss';

const PublicRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/homel', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === true
    ? (<Component { ...props } loginStatus={loginStatus} uid={firebase.auth().currentUser.uid}/>)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

 class App extends Component {
  state = {
    loginStatus: false,
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
          loginStatus: false,
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
            <PrivateRoute path='/profile' exact component={Profile} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/order-history' exact component={OrderHistory} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/homel' component={Home} loginStatus={this.state.loginStatus}/>
            <PublicRoute path='/home' exact component={Home} loginStatus={this.state.loginStatus}/>
            <PublicRoute path='/register' exact component={Register} loginStatus={this.state.loginStatus}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;