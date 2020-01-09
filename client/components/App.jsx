import React, { Component } from 'react';
import Teams6A from './Teams6A';
import Navbar from './Navbar';
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
    axios.get('http://localhost:4545/all').then(res => this.setState({ teams6A: res.data }));
  }

  sort(criteria) {
    let sorted;
    if (criteria === 'district') {
      sorted = this.state.teams6A.sort((a, b) => a.district - b.district);
    }
  }

  render() {
    this.sort('district');
    return (
      <>
        <Navbar />
        <Teams6A teams={this.state.teams6A} />
      </>
    );
  }
}

export default App;
