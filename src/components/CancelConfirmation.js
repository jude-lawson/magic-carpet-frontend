import React, { Component } from 'react';

export default class CancelConfirmation extends Component {
  
  goHome = () => {
    this.props.history.push('/main') 
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
