import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch, browser
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../../data/FirebaseFactory/connection';
import Register from '../register/register';
import Profile from '../Profile/Profile';
import ProfileCalls from '../../data/PortAndMoonFactory/Profile'
import Home from '../home/home';
import Freight from '../freight/freight';
import Passenger from '../passenger/passenger';
import OrderHistory from '../OrderHistory/OrderHistory';
import Seller from '../seller/seller';
import RocketDetail from '../rocketDetail/rocketDetail';
import SellerHome from '../sellerHome/sellerHome';
import NavbarC from '../navbar/navbarC';
import Cart from '../Cart/Cart';
import './app.scss';

connection();

const PublicRoute = ({ component: Component, loginStatus, ...rest }) => {
  const routeChecker = props => (loginStatus === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/homel', state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, currentUser, ...rest }) => {
  const routeChecker = props => (loginStatus === true
    ? (<Component { ...props } loginStatus={loginStatus} currentUser={currentUser}/>)
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
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loginStatus: true,
          pendingUser: false,
        });

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
      } else {
        this.setState({
          loginStatus: false,
          pendingUser: false,
          creationDate: undefined,
          firstName: undefined,
          id: undefined,
          lastName: undefined,
          userName: undefined,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {

    const currentUser = {
      creationDate: this.state.creationDate,
      firstName: this.state.firstName,
      id: this.state.id,
      lastName: this.state.lastName,
      userName: this.state.userName,
    }

    return (
        <BrowserRouter>
          <NavbarC/>
          <React.Fragment>
            <Switch>
              <PublicRoute path='/register' exact component={Register} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/freightl' exact component={Freight} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/passengerl' exact component={Passenger} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/freightl+*' component={Freight} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/passengerl+*' component={Passenger} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/' exact component={Register} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/homel' component={Home} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PublicRoute path='/home' exact component={Home} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/profile' exact component={Profile} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/seller/*' component={Seller} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/detail/*' component={RocketDetail} loginStatus={this.state.loginStatus} currentUser={currentUser}/>  
              <PrivateRoute path='/sellerhome' component={SellerHome} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/order-history' exact component={OrderHistory} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/cart' exact component={Cart} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default App;