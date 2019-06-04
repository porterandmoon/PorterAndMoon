import React from 'react';
import NavbarC from '../navbar/navbarC';
import './freight.scss';

class freight extends React.Component {
  historyPusher = (path) => {
    this.props.history.push(path);
  }

  render() {
    return(
      <div className='freight'>
        <NavbarC historyPusher={this.historyPusher}/>
      </div>
    );
  }
}

export default freight;