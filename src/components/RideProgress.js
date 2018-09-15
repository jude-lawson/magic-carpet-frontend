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
  }
  
  render() {
    return (
      <div className='container'>
        <button className='button cancel-btn' onClick={this.cancelRide}>Cancel Ride</button>
      </div>
    );
  }
}
