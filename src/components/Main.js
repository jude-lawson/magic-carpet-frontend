import React, { Component } from 'react';

import { hostname } from '../public_config'
import RideService from '../services/ride_service'
import Settings from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton';

export default class Main extends Component {

  async getDestination() {
    console.log('Getting position...')
    navigator.geolocation.getCurrentPosition((position) => {
      retrieveDestination(position);
      console.log('Position retrieved!')
    });

    const retrieveDestination = async (position) => {
      let origin = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      let fetch_init = {
        "method": "post",
        "headers": {
          "Content_Type": "application/json"
        },
        body: JSON.stringify({
          "search_settings": {
            "radius": localStorage.getItem('maxRadius'),
            "latitude": `${origin.latitude}`,
            "longitude": `${origin.longitude}`,
            "price": localStorage.getItem('price'),
            "term": "restaurants",
            "open_now": true
          },
          "restrictions": {
            "categories": [],
            "min_radius": localStorage.getItem('minRadius'),
          }
        })
      }

      let response = await fetch(`${hostname}/api/v1/adventures`, fetch_init);
      let parsed_response = await response.json();
      let min = (parseFloat(parsed_response.price_range.min_cost) / 100).toFixed(2)
      let max = (parseFloat(parsed_response.price_range.max_cost) / 100).toFixed(2)
      let confirmation = window.confirm(`This ride will cost about $${min} - $${max} USD. Would you like to continue?`)
      if (confirmation) {
        RideService.callRide(parsed_response.destination, origin)
      } else {
        return;
      }
    }
  }

  openSettings() {
    window.location.href = '/settings'
  }

  render () {
    return(
      <div className='container'>
        <IconButton className='settings-button'>
          <Settings className='settings-icon' onClick={this.openSettings}/>
        </IconButton>
        <button className="button magic-carpet-btn" onClick={this.getDestination}>Magic Carpet</button>
      </div>
    );
  }
}
