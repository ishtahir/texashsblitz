import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      teams6A: []
    };
  }

  componentDidMount() {
    this.getAllTeams();
  }

  getAllTeams() {
    axios.get('/all').then(res => this.setState({ teams6A: res.data }));
  }

  render() {
    return <h1>Welcome to Texas HS BLiTZ</h1>;
  }
}

export default App;
