import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sponsor from './components/Sponsor'
import Login from './components/Login';
import Main from './components/Main';
import Loader from './components/Loader';
import RideProgress from './components/RideProgress';
import SettingsPage from './components/SettingsPage';
import CancelConfirmation from './components/CancelConfirmation';
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
    let ride_client_id = process.env.REACT_APP_RIDE_CLIENT_ID;
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

      // NoThis is for authenticating through rideService
      var parameters = window.location.search
      if (parameters && parameters.includes('code')) {
        parameters  = parameters.slice(1);
        parameters = parameters.split('&').reduce((paramObject,combinedParameter) => {
          combinedParameter = combinedParameter.split('=');
          paramObject[combinedParameter[0]] = combinedParameter[1];
          return paramObject;
        }, {});

        RideService.getInitialAuth(parameters)
      }
    }
  }


  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
              <Route exact path='/' render={() => <Login handleLogin={this.logIn} />}/>
              <Route path='/main' component={Main} />
              <Route path='/settings' component={SettingsPage} />
              <Route path='/loading' component={Loader} />
              <Route path='/ride_called' component={RideProgress} />
              <Route path='/ride_cancelled' component={CancelConfirmation} />
              <Sponsor />
          <div className="background-image"></div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
