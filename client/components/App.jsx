import React, { Component } from 'react';
import All6ATeamsView from './All6ATeamsView';
import Navbar from './Navbar';
import DistrictView from './DistrictView';
import StateAppearanceView from './StateAppearanceView';
import EnrollView from './EnrollView';
import Footer from './Footer';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      teams6A: [],
      filteredTeams: [],
      searchInput: '',
      view: 'all',
      districts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      hamburgerClicked: false,
      isDesktop: true
    };

    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidMount() {
    this.getAllTeams();
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  getAllTeams() {
    axios.get('/load').then(res => this.setState({ teams6A: res.data }, () => this.sort()));
  }

  updateWidth() {
    let isDesktop = window.innerWidth > 740;
    this.setState({ isDesktop });
  }

  changeView(view) {
    this.setState({ view });
  }

  handleSearchInput(searchInput) {
    this.setState({ searchInput }, () => this.handleFilteredTeams());
  }

  handleFilteredTeams() {
    const filteredTeams = this.state.teams6A.filter(
      team =>
        `${team.city.toLowerCase()} ${team.school.toLowerCase()} ${team.mascot.toLowerCase()}`.includes(this.state.searchInput.toLowerCase()) ||
        team.city.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
        team.school.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
        team.mascot.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );

    this.setState({ filteredTeams });
  }

  handleHamburger() {
    let hamburgerClicked = !this.state.hamburgerClicked;
    this.setState({ hamburgerClicked });
  }

  sort() {
    let sorted = this.state.teams6A.sort((a, b) => {
      if ((a.city ? a.city : a.school).toLowerCase() < (b.city ? b.city : b.school).toLowerCase()) {
        return -1;
      } else if ((a.city ? a.city : a.school).toLowerCase() > (b.city ? b.city : b.school).toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  renderView() {
    if (this.state.view === 'all') {
      return (
        <All6ATeamsView teams={this.state.searchInput === '' ? this.state.teams6A : this.state.filteredTeams} isDesktop={this.state.isDesktop} />
      );
    } else if (this.state.view === 'district') {
      return (
        <DistrictView
          districts={this.state.districts}
          teams={this.state.searchInput === '' ? this.state.teams6A : this.state.filteredTeams}
          isDesktop={this.state.isDesktop}
        />
      );
    } else if (this.state.view === 'enroll') {
      return (
        <EnrollView
          teams={(this.state.searchInput === '' ? this.state.teams6A : this.state.filteredTeams).sort((a, b) => b.enrollment - a.enrollment)}
          isDesktop={this.state.isDesktop}
        />
      );
    } else if (this.state.view === 'champions') {
      return (
        <StateAppearanceView
          teams={(this.state.searchInput === '' ? this.state.teams6A : this.state.filteredTeams)
            .filter(team => team.stateAppearances.length > 0)
            .sort((a, b) => b.stateAppearances.length - a.stateAppearances.length)}
        />
      );
    }
  }

  render() {
    this.sort();
    return (
      <>
        <Navbar
          changeView={this.changeView.bind(this)}
          handleSearchInput={this.handleSearchInput.bind(this)}
          handleHamburger={this.handleHamburger.bind(this)}
          hamburgerClicked={this.state.hamburgerClicked}
          searchInput={this.state.searchInput}
          view={this.state.view}
        />
        <input
          type="text"
          className="search"
          placeholder="&#x1F50D; Filter by city, school, mascot"
          value={this.state.searchInput}
          onChange={evt => this.handleSearchInput(evt.target.value)}
        />
        {this.renderView()}
        <Footer />
      </>
    );
  }
}

export default App;
