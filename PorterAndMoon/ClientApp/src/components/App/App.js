import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../../data/FirebaseFactory/connection';
import Register from '../register/register';
import Profile from '../Profile/Profile';
import ProfileCalls from '../../data/PortAndMoonFactory/Profile'
import Home from '../home/home';
<<<<<<< HEAD:PorterAndMoon/ClientApp/src/components/app/App.js
import Freight from '../freight/freight';
import Passenger from '../passenger/passenger';
=======
import OrderHistory from '../OrderHistory/OrderHistory';
>>>>>>> master:PorterAndMoon/ClientApp/src/components/App/App.js
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
    creationDate: undefined,
    firstName: undefined,
    id: undefined,
    lastName: undefined,
    userName: undefined,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ProfileCalls.currentUserInfo(user.uid)
        .then(profileInfo => {
          const content = profileInfo.data
            this.setState({
              creationDate: content.creationDate,
              firstName: content.firstName,
              id: content.id,
              lastName: content.lastName,
              userName: content.userName
            });
          })
        .catch(err => {
          console.error(err);
        });
  
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
            <PrivateRoute path='/freightl' exact component={Freight} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/passengerl' exact component={Passenger} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/freightl+*' component={Freight} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/passengerl+*' component={Passenger} loginStatus={this.state.loginStatus}/>
            <PublicRoute path='/home' exact component={Home} loginStatus={this.state.loginStatus}/>
            <PublicRoute path='/register' exact component={Register} loginStatus={this.state.loginStatus}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;