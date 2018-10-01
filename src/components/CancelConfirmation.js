import React, { Component } from 'react';

export default class CancelConfirmation extends Component {
  
  goHome() {
    window.location.href = '/main'
  }

  render() {
    return (
      <div className='container'>
        <h3 className='cancellation-confirmation'>No worries! Your ride has been cancelled!</h3>
        <button className='button' onClick={this.goHome}>Try Again?</button>
      </div>
    );
  }
}
