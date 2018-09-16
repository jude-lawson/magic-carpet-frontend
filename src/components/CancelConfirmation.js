import React, { Component } from 'react';

export default class CancelConfirmation extends Component {
  
  goHome() {
    window.location.href = '/main'
  }

  render() {
    return (
      <div className='container'>
        <p>No worries! Your ride has been cancelled!</p>
        <button className='button' onClick={this.goHome}>Try Again?</button>
      </div>
    );
  }
}
