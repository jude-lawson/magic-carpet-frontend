import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'

import LoginPage from './LoginPage'
import MainPage from './MainPage'

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
        <MainPage />
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
