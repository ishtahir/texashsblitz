import React, { Component } from 'react';
import Navbar from './Navbar';
import ClassesView from './ClassesView';
import DistrictView from './DistrictView';
import EnrollView from './EnrollView';
import StateAppearanceView from './StateAppearanceView';
import Footer from './Footer';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      allTeamsClasses: [],
      currentClassTeams: [],
      filteredTeams: [],
      currentDivisionTeams: [],
      searchInput: '',
      view: 'classes',
      districts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      hamburgerClicked: false,
      isDesktop: true,
      currentClass: 6,
      currentDivision: 1
    };

    this.sort = this.sort.bind(this);
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
    axios.get('/load').then(res =>
      this.setState({ allTeamsClasses: res.data }, () => {
        this.handleCurrentClassTeams();
        this.handleCurrentDivisionTeams();
      })
    );
  }

  handleChangeView(view) {
    this.setState({ view });
  }

  handleCurrentClass(currentClass) {
    this.setState({ currentClass }, () => {
      this.handleCurrentClassTeams();
      this.setState({ currentDivision: 1 }, () => {
        this.handleCurrentDivisionTeams();
      });
    });
  }

  handleCurrentClassTeams() {
    const currentClassTeams = this.state.allTeamsClasses
      .filter(team => team.class === this.state.currentClass)
      .sort((a, b) => (a.city ? a.city : a.school - b.city ? b.city : b.school));
    this.setState({ currentClassTeams });
  }

  handleCurrentDivision(currentDivision) {
    this.setState({ currentDivision, searchInput: '' }, () => this.handleCurrentDivisionTeams());
  }

  handleCurrentDivisionTeams() {
    let currentDivisionTeams;
    if (this.state.currentClass > 6) {
      currentDivisionTeams = this.state.allTeamsClasses;
    } else {
      currentDivisionTeams = this.state.allTeamsClasses
        .filter(team => team.division === this.state.currentDivision && team.class === this.state.currentClass)
        .sort((a, b) => (a.city ? a.city : a.school - b.city ? b.city : b.school));
    }
    this.setState({ currentDivisionTeams });
  }

  handleFilteredTeams() {
    let currentTeams;
    if (this.state.view === 'appearances') {
      currentTeams = this.state.currentClassTeams;
    } else if (this.state.view === 'classes' && this.state.currentClass > 6) {
      currentTeams = this.state.allTeamsClasses;
    } else {
      currentTeams = this.state.currentDivisionTeams;
    }
    const filteredTeams = currentTeams.filter(
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

  handleSearchInput(searchInput) {
    this.setState({ searchInput }, () => this.handleFilteredTeams());
  }

  updateWidth() {
    let isDesktop = window.innerWidth > 740;
    this.setState({ isDesktop });
  }

  sort(a, b) {
    if (this.state.currentClass > 6) {
      if ((a.city ? a.city : a.school) < (b.city ? b.city : b.school)) {
        return -1;
      } else if ((a.city ? a.city : a.school) > (b.city ? b.city : b.school)) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a.class < b.class) {
        return 1;
      } else if (b.class < a.class) {
        return -1;
      } else {
        if ((a.city ? a.city : a.school) < (b.city ? b.city : b.school)) {
          return -1;
        } else if ((a.city ? a.city : a.school) > (b.city ? b.city : b.school)) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }

  renderView() {
    let mainTeams;
    if (this.state.currentClass > 6) {
      mainTeams = this.state.allTeamsClasses;
    } else {
      mainTeams = this.state.currentDivisionTeams;
    }
    if (this.state.view === 'classes') {
      return (
        <ClassesView
          teams={(this.state.searchInput === '' ? mainTeams : this.state.filteredTeams).sort(this.sort)}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
          currentDivision={this.state.currentDivision}
        />
      );
    } else if (this.state.view === 'district') {
      return (
        <DistrictView
          districts={this.state.districts}
          teams={this.state.searchInput === '' ? this.state.currentDivisionTeams : this.state.filteredTeams}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
          currentDivision={this.state.currentDivision}
        />
      );
    } else if (this.state.view === 'enroll') {
      return (
        <EnrollView
          teams={(this.state.searchInput === '' ? this.state.currentClassTeams : this.state.filteredTeams).sort(
            (a, b) => b.enrollment - a.enrollment
          )}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
        />
      );
    } else if (this.state.view === 'appearances') {
      return (
        <StateAppearanceView
          teams={(this.state.searchInput === '' ? this.state.currentClassTeams : this.state.filteredTeams)
            .filter(team => team.stateAppearances.length > 0)
            .sort((a, b) => b.stateAppearances.length - a.stateAppearances.length)}
          currentClass={this.state.currentClass}
        />
      );
    }
  }

  render() {
    return (
      <>
        <Navbar
          handleChangeView={this.handleChangeView.bind(this)}
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
        <div className="class-div-select-btn">
          <label className="text-desc">Change Classification:</label>
          <select className="dropdown" onChange={evt => this.handleCurrentClass(Number(evt.target.value))}>
            <option value="6">Class 6A</option>
            <option value="5">Class 5A</option>
            <option value="4">Class 4A</option>
            <option value="3">Class 3A</option>
            <option value="2">Class 2A</option>
            <option value="1">Class 1A</option>
            <option value="7">ALL TEAMS</option>
          </select>
          {this.state.view !== 'appearances' && this.state.view !== 'enroll' && this.state.currentClass < 6 ? (
            <>
              <button className="div1-btn btn" onClick={() => this.handleCurrentDivision(1)}>
                Division 1
              </button>
              <button className="div2-btn btn" onClick={() => this.handleCurrentDivision(2)}>
                Division 2
              </button>
            </>
          ) : null}
        </div>

        <p className="text-desc">
          Total Teams:{' '}
          {this.state.searchInput === '' ? (
            <span className="total-number">{this.state.currentDivisionTeams.length}</span>
          ) : (
            <span className="total-number">{this.state.filteredTeams.length}</span>
          )}
        </p>

        {this.renderView()}
        <Footer />
      </>
    );
  }
}

export default App;
