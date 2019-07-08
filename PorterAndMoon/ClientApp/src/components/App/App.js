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
import Freight from '../freight/freight';
import Passenger from '../passenger/passenger';
import OrderHistory from '../OrderHistory/OrderHistory';
import UserPayments from '../UserPayments/UserPayments';
import Seller from '../seller/seller';
import RocketDetail from '../rocketDetail/rocketDetail';
import SellerHome from '../sellerHome/sellerHome';
import SellerRockets from '../sellerRockets/sellerRockets';
import NavbarC from '../navbar/navbarC';
import Cart from '../Cart/Cart';
import SearchResults from '../SearchResults/SearchResults';
import Seat from '../seatSelector/seatSelector';
import './app.scss';

connection();

const PublicRoute = ({ component: Component, loginStatus, currentPath, currentUser, ...rest }) => {
  const routeChecker = props => (loginStatus === false
    ? (<Component { ...props } currentPath={currentPath} currentUser={currentUser}/>)
    : (<Redirect to={{ pathname: currentPath, state: { from: props.location } } } />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, currentUser, searchData, ...rest }) => {
  const routeChecker = props => (loginStatus === true
    ? (<Component { ...props } loginStatus={loginStatus} currentUser={currentUser} searchData={searchData}/>)
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
    searchData: [],
    currentPath: window.location.href.slice(window.location.href.search('/') + 16) 
  }

  setSearchData = (response) => {
    this.setState({ searchData: response })
  }

  componentDidMount() {
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
              userName: content.userName,
              loginStatus: true,
              pendingUser: false
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
          <NavbarC searchData={this.setSearchData}/>
          <React.Fragment>
              <div className="switch-comp">
            <Switch>
              <PublicRoute path='/register' exact component={Register} currentPath={this.state.currentPath} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/freightl' exact component={Freight} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/passengerl' exact component={Passenger} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/freightl+*' component={Freight} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/passengerl+*' component={Passenger} loginStatus={this.state.loginStatus}/>
              <PrivateRoute path='/' exact component={Home} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/homel' component={Home} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PublicRoute path='/home' exact component={Home} currentPath={this.state.currentPath} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/profile' exact component={Profile} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/seller/*' component={Seller} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/sellerhome' exact component={SellerHome} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/sellerhome/rockets+*' component={SellerRockets} loginStatus={this.state.loginStatus} currentUser={currentUser}/>  
              <PrivateRoute path='/detail/*' component={RocketDetail} loginStatus={this.state.loginStatus} currentUser={currentUser}/>  
              <PrivateRoute path='/order-history' exact component={OrderHistory} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/payment-types' exact component={UserPayments} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/cart' exact component={Cart} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
              <PrivateRoute path='/search-results' exact component={SearchResults} loginStatus={this.state.loginStatus} searchData={this.state.searchData}/>
              <PrivateRoute path='/seat/*' component={Seat} loginStatus={this.state.loginStatus} currentUser={currentUser}/>
            </Switch>
              </div>
          </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default App;