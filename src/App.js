import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Main from './components/Main';
import { ride_client_id } from './config';
import RideService from './services/ride_service';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    let oauth_url = `https://api.lyft.com/oauth/authorize?client_id=${ride_client_id}&scope=public%20profile%20rides.read%20rides.request%20offline&state=%20&response_type=code`
    window.open(oauth_url,'_self');
  }

  componentDidMount() {
    if (window.location.pathname === '/main') {
      return;
    }

    if (localStorage.getItem('access_token') && (Date.now() - localStorage.getItem('token_timestamp')) < 3000) {
      window.location.href = '/main'
    } else {
       // This is for authenticating through rideService
      var parameters = window.location.search
      if (parameters && parameters.includes('code')) {
        parameters  = parameters.slice(1);
        parameters = parameters.split('&').reduce((paramObject,combinedParameter) => {
          combinedParameter = combinedParameter.split('=');
          paramObject[combinedParameter[0]] = combinedParameter[1];
          return paramObject;
        }, {});

        RideService.getInitialAuth(parameters).then(initialAuth => {
          localStorage.setItem('access_token', initialAuth.access_token)
          localStorage.setItem('refresh_token', initialAuth.refresh_token)
        });

        window.location.href = '/main'
      }
    }
    // If localStorage:access_token and it's not expired, window.location.href = /main
    // else trigger auth flow
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' 
                 render={() => <Login handleLogin={this.logIn} />}
          />
          <Route path='/main' component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
