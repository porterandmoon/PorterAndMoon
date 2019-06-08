import React from 'react';
import NavbarC from '../navbar/navbarC';
import './rocketDetail.scss';

class rocketDetail extends React.Component {
  historyPusher = (path) => {
    this.props.history.push(path);
  }

  render() {
    return(
      <div className='rocketDetail'>
        <NavbarC historyPusher={this.historyPusher}/>
        <h1>ROCKET DETAIL PAGE</h1>
      </div>
    );
  }
}

export default rocketDetail;