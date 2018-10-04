import React, { Component } from 'react';
import { withRouter } from 'react-router';

import RideService from '../services/ride_service'
import Loader from './Loader'
import Settings from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton';

class Main extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem('minRadius') === undefined) {
      localStorage.setItem('minRadius', 3219);
      localStorage.setItem('maxRadius', 6437);
      localStorage.setItem('rating', [2,4]);
      localStorage.setItem('price', [2,3]);
    }
  }

  getDestination = async () => {
    this.setState({
      loading: true
    });

    navigator.geolocation.getCurrentPosition((position) => {
      retrieveDestination(position);
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

      let response = await fetch(`${process.env['REACT_APP_API_HOSTNAME']}/api/v1/adventures`, fetch_init);
      let parsed_response = await response.json();
      if (response.status === 400 && parsed_response.error === "ImpossibleRequest: Filter Criteria too strict") {
        this.props.history.push('/no-destination');
      } else {
        localStorage.setItem('current_reviews', JSON.stringify(parsed_response.destination.reviews));
        let min = (parseFloat(parsed_response.price_range.min_cost) / 100).toFixed(2)
        let max = (parseFloat(parsed_response.price_range.max_cost) / 100).toFixed(2)
        let confirmation = window.confirm(`This ride will cost about $${min} - $${max} USD. Would you like to continue?`)
        if (confirmation) {
          RideService.callRide(parsed_response.destination, origin)
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
          return;
        }
      }
    }
  }

  openSettings = () => {
    this.props.history.push('/settings');
  }

  render () {
    if(this.state.loading) {
      return(
        <Loader></Loader>
      );
    }
    else {
      return(
        <div className='container'>
          <IconButton className='settings-button'>
            <Settings className='settings-icon' onClick={this.openSettings}/>
          </IconButton>
          <span className='optional-message-container'>{this.props.optionalMessage}</span>
          <button className="button magic-carpet-btn" onClick={this.getDestination}>Magic Carpet</button>
        </div>
      );
    }
  }
}

export default withRouter(Main);
