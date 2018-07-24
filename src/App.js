import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import LoginPage from './LoginPage'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState(() => ({
      isLoggedIn: true
    }));
  }


  render() {
    let page;
    if (!this.state.isLoggedIn) {
      page = (
        <LoginPage handleLogin={this.handleLogin} />
      );
    } else {
      page = (
        <div>
          <AppBar>
            <Toolbar>
              <Grid container justify='flex-end' spacing={12}>
                <Grid item xs={2}>
                  <SettingsApplicationsIcon style={{ fontSize: 40 }} />
                </Grid>
                <Grid item xs={1}>
                  <AccountCircleIcon style={{ fontSize: 40 }} />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Button variant='contained'>Magic Carpet</Button>
        </div>
      );
    }

    return (
      <div className="App">
        <Grid container spacing={24} alignItems='center' justify='center' id='page-container'>
          {page}
        </Grid>
      </div>
    );
  }
}

export default App;
