import React, { Component } from 'react';
import './App.css';

import Login from './components/Login';
import Main from './components/Main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    this.setState({ loggedIn: true })
  }


  render() {
    let content;
    if (!this.state.loggedIn) {
      content = (
        <Login handleLogin={this.logIn} />
      );
    } else if (this.state.loggedIn) {
      content = (
        <Main />
      );
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
