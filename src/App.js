import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
        <Button onClick={this.handleLogin}
                variant='contained'>Log In With Lyft</Button>
      );
    } else {
      page = (
        <div>
          <AppBar>
            <Toolbar>
              <Grid container spacing={12}>
                <Grid item xs={10}>
                  <h1 style={{ fontSize: 22, textAlign: 'left' }}>Magic Carpet</h1>
                </Grid>
                <Grid item xs={1}>
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
