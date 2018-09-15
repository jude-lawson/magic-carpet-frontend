import React, { Component } from 'react';
import { hostname } from '../public_config'

// {
// 	"search_settings": {
// 		"radius": 5000,
// 		"latitude": 39.7566541,
// 		"longitude": -105.00066629999999,
// 		"price": [1, 2, 3],
// 		"term": "restaurants",
// 		"open_now": true
// 	},
// 	"restrictions": {
// 		"categories": [],
// 		"min_radius": 1000
// 	}
// }

export default class Main extends Component {

  async getDestination() {
    console.log('Getting position...')
    navigator.geolocation.getCurrentPosition((position) => {
      retrieveDestination(position);
      console.log('Position retrieved!')
    });

    const retrieveDestination = async (position) => {
      let fetch_init = {
        "method": "post",
        "headers": {
          "Content_Type": "application/json"
        },
        body: JSON.stringify({
          "search_settings": {
            "radius": 5000,
            "latitude": `${position.coords.latitude}`,
            "longitude": `${position.coords.longitude}`,
            "price": [1, 2, 3],
            "term": "restaurants",
            "open_now": true
          },
          "restrictions": {
            "categories": [],
            "min_radius": 1000
          }
        })
      }

      let response = await fetch(`${hostname}/api/v1/adventures`, fetch_init);
      let parsed_response = await response.json();
      debugger
    }

    // let response = await fetch(`${hostname}/api/v1/adventures`, fetch_init)
    // console.log(response)
  }


  async callRide() {
    // let request = JSON.stringify({ 
    //   "ride_type": "lyft",
    //   "origin": { "lat": location.latitude, "long": location.longitude }
    // })

    // let response = await fetch('https://api.lyft.com/v1/rides', {
    //   method: 'post',
    //   headers: {
    //     'Authorization':  `Bearer ${localStorage.access_token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: {

    //   }
    // })
  }

  render () {
    return(
      <div className='container'>
        <button className="button magic-carpet-btn" onClick={this.getDestination}>Magic Carpet</button>
      </div>
    );
  }
}
