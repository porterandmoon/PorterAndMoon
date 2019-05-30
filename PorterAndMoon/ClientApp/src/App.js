import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Profile from './components/pages/Profile/Profile';
import firebase from 'firebase';
import axios from 'axios';

const PublicRoute = ({ component: Component, loginStatus, ...rest }) => {
    const routeChecker = props => (loginStatus === false
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
    return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, loginStatus, ...rest }) => {
    const routeChecker = props => (loginStatus === true
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
    return <Route {...rest} render={props => routeChecker(props)} />;
};

export default class App extends Component {

  state = {
    loginStatus: true,
    //pendingUser: true,
  }

  componentDidMount() {
    //connection();
    /*this.removeListener = firebase.auth().onAuthStateChanged((user) => {
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
    });*/
  }

  componentWillUnmount() {
    this.removeListener();
  }

  

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <PrivateRoute path='/home' component={Home} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/' component={Home} loginStatus={this.state.loginStatus}/>
            <PrivateRoute path='/profile' component={Profile} loginStatus={this.state.loginStatus}/>
            {/*<PrivateRoute path='/' exact component={Home} loginStatus={this.state.loginStatus}/>*/}
            <PublicRoute path='/login' exact component={Home} loginStatus={this.state.loginStatus}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
