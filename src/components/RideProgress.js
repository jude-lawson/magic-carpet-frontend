import React, { Component } from 'react';

export default class RideProgress extends Component {
  
  async cancelRide() {
    let ride_id = localStorage.latest_ride_id;

    let fetch_init = {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${localStorage.access_token}`,
        "Content-Type": 'application/json'
      }
    }

    let response = await fetch(`https://api.lyft.com/v1/rides/${ride_id}/cancel`, fetch_init)

    if (response.status === 204) {
      window.location.href = '/ride_cancelled'
    } else {
      let parsed_response = await response.json()
      RideProgress.confirmCancellation(parsed_response)
    }
  }

  static confirmCancellation(parsed_response) {
    let amount = (parseFloat(parsed_response.amount) / 100).toFixed(2);
    let double_check = window.confirm(`Cancelling this ride will incur a fee of ${amount} USD. Would you still like to cancel?`)

    if (double_check) {
      RideProgress.cancelAgain(parsed_response)
    } else {
      return;
    }
  }

  static async cancelAgain(parsed_response) {
    let fetch_init = {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${localStorage.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "cancel_confirmation_token": `${parsed_response.token}` })
    }

    let response = await fetch(`https://api.lyft.com/v1/rides/${localStorage.latest_ride_id}/cancel`, fetch_init)

    if (response.status === 204) {
      window.location.href = '/main'
    } else {
      alert('An unknown error has occurred. Please open up the Lyft app to confirm cancellation')
      window.location.href = '/main'
    }
  }
  
  render() {
    return (
      <div className='container'>
        <button className='button cancel-btn' onClick={this.cancelRide}>Cancel Ride</button>
      </div>
    );
  }
}
