import React from 'react';
import NavbarC from '../navbar/navbarC';
import './passenger.scss';

class passenger extends React.Component {
  historyPusher = (path) => {
    this.props.history.push(path);
  }

  render() {
    return(
      <div className='passenger'>
        <NavbarC historyPusher={this.historyPusher}/>
      </div>
    );
  }
}

export default passenger;