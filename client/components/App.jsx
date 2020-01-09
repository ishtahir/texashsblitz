import React, { Component } from 'react';
import Teams6A from './Teams6A';
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
    return (
      <>
        <h1 className="headline">Welcome to Texas HS BLiTZ</h1>
        <Teams6A teams={this.state.teams6A} />
      </>
    );
  }
}

export default App;
