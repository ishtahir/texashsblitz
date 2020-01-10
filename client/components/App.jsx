import React, { Component } from 'react';
import All6ATeamsView from './All6ATeamsView';
import Navbar from './Navbar';
import DistrictView from './DistrictView';
import StateAppearanceView from './StateAppearanceView';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      teams6A: [],
      filteredTeams: [],
      searchInput: '',
      view: 'all',
      districts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    };
  }

  componentDidMount() {
    this.getAllTeams();
  }

  getAllTeams() {
    axios.get('http://localhost:4545/all').then(res => this.setState({ teams6A: res.data }));
  }

  changeView(view) {
    this.setState({ view });
  }

  handleSearchInput(searchInput) {
    this.setState({ searchInput });
  }

  sort(criteria) {
    let sorted;
    if (criteria === 'district') {
      sorted = this.state.teams6A.sort((a, b) => a.district - b.district);
    }
  }

  renderView() {
    if (this.state.view === 'all') {
      return <All6ATeamsView teams={this.state.teams6A} />;
    } else if (this.state.view === 'district') {
      return <DistrictView districts={this.state.districts} teams={this.state.teams6A} />;
    } else if (this.state.view === 'champions') {
      return (
        <StateAppearanceView
          teams={this.state.teams6A
            .filter(team => team.stateAppearences.length > 0)
            .sort((a, b) => b.stateAppearences.length - a.stateAppearences.length)}
        />
      );
    }
  }

  render() {
    this.sort('district');
    return (
      <>
        <Navbar changeView={this.changeView.bind(this)} />
        {this.renderView()}
      </>
    );
  }
}

export default App;
