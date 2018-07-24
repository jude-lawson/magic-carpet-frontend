import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }


  render() {
    let page;
    if (!this.state.isLoggedIn) {
      page = (
        <Grid item xs={12}>
          <Button variant='contained'>Log In With Lyft</Button>
        </Grid>
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
