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
      currentlyDisplayingTeams: [],
      districts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      searchInput: '',
      view: 'classes',
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
    axios.get('/mongo').then(res =>
      this.setState({ allTeamsClasses: res.data }, () => {
        this.handleCurrentClassTeams();
        this.handleCurrentDivisionTeams();
      })
    );
  }

  handleChangeView(view) {
    this.setState({ view }, () => this.handleFilteredTeams());
  }

  handleCurrentClass(classDivision) {
    const currentClass = Number(classDivision.slice(0, 1));
    const currentDivision = currentClass === 6 ? 1 : Number(classDivision.slice(1, 2));
    this.setState({ currentClass }, () => {
      this.handleCurrentClassTeams();
      this.setState({ currentDivision }, () => {
        this.handleCurrentDivisionTeams();
      });
    });
  }

  handleCurrentClassTeams() {
    const currentClassTeams = this.state.allTeamsClasses
      .filter(team => team.class === this.state.currentClass)
      .sort((a, b) => (a.city ? a.city : a.school) - (b.city ? b.city : b.school));
    this.setState({ currentClassTeams });
  }

  handleCurrentlyDisplayingTeams() {
    let currentlyDisplayingTeams;
    if (this.state.searchInput === '') {
      if (this.state.currentClass > 6) {
        if (this.state.view === 'districts') {
          currentlyDisplayingTeams = this.state.currentClassTeams;
        } else if (this.state.view === 'appearances') {
          currentlyDisplayingTeams = this.state.filteredTeams;
        } else {
          currentlyDisplayingTeams = this.state.allTeamsClasses;
        }
      } else {
        if (this.state.view === 'appearances') {
          currentlyDisplayingTeams = this.state.filteredTeams;
        } else {
          if (this.state.view === 'appearances') {
            currentlyDisplayingTeams = this.state.currentClassTeams;
          } else {
            currentlyDisplayingTeams = this.state.currentDivisionTeams;
          }
        }
      }
    } else {
      if (this.state.currentClass > 6 && this.state.view === 'districts') {
        currentlyDisplayingTeams = this.state.currentClassTeams;
      } else {
        currentlyDisplayingTeams = this.state.filteredTeams;
      }
    }
    this.setState({ currentlyDisplayingTeams });
  }

  handleCurrentDivision(currentDivision) {
    this.setState({ currentDivision }, () => this.handleCurrentDivisionTeams());
  }

  handleCurrentDivisionTeams() {
    let currentDivisionTeams = this.state.allTeamsClasses
      .filter(team => team.division === this.state.currentDivision && team.class === this.state.currentClass)
      .sort((a, b) => (a.city ? a.city : a.school - b.city ? b.city : b.school));
    this.setState({ currentDivisionTeams }, () => this.handleFilteredTeams());
  }

  handleFilteredTeams() {
    let currentTeams;
    if (this.state.currentClass > 6) {
      if (this.state.view === 'districts') {
        currentTeams = this.state.currentClassTeams;
      } else if (this.state.view === 'appearances') {
        currentTeams = this.state.allTeamsClasses.filter(team => team.stateAppearances.length > 0);
      } else {
        currentTeams = this.state.allTeamsClasses;
      }
    } else {
      if (this.state.view === 'appearances') {
        currentTeams = this.state.currentClassTeams.filter(team => team.stateAppearances.length > 0);
      } else {
        currentTeams = this.state.currentDivisionTeams;
      }
    }
    const filteredTeams = currentTeams.filter(
      team =>
        `${team.city.toLowerCase()} ${team.school.toLowerCase()} ${team.mascot.toLowerCase()}`.includes(this.state.searchInput.toLowerCase()) ||
        team.city.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
        team.school.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
        team.mascot.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );

    this.setState({ filteredTeams }, () => this.handleCurrentlyDisplayingTeams());
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
    let currentTeams = this.state.currentlyDisplayingTeams;
    if (this.state.view === 'classes') {
      return (
        <ClassesView
          teams={currentTeams.sort(this.sort)}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
          currentDivision={this.state.currentDivision}
        />
      );
    } else if (this.state.view === 'districts') {
      return (
        <DistrictView
          districts={this.state.districts}
          teams={currentTeams}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
          currentDivision={this.state.currentDivision}
        />
      );
    } else if (this.state.view === 'enroll') {
      return (
        <EnrollView
          teams={currentTeams.sort((a, b) => b.enrollment - a.enrollment)}
          isDesktop={this.state.isDesktop}
          currentClass={this.state.currentClass}
        />
      );
    } else if (this.state.view === 'appearances') {
      return (
        <StateAppearanceView
          teams={currentTeams.sort((a, b) => b.stateAppearances.length - a.stateAppearances.length)}
          currentClass={this.state.currentClass}
        />
      );
    }
  }

  renderOptions() {
    if (this.state.view === 'appearances') {
      return (
        <>
          <option value="6">Class 6A</option>
          <option value="51">Class 5A</option>
          <option value="41">Class 4A</option>
          <option value="31">Class 3A</option>
          <option value="21">Class 2A</option>
          <option value="11">Class 1A</option>
          <option value="7">ALL TEAMS</option>
        </>
      );
    } else {
      return (
        <>
          <option value="6">Class 6A</option>
          <option value="51">Class 5A D1</option>
          <option value="52">Class 5A D2</option>
          <option value="41">Class 4A D1</option>
          <option value="42">Class 4A D2</option>
          <option value="31">Class 3A D1</option>
          <option value="32">Class 3A D2</option>
          <option value="21">Class 2A D1</option>
          <option value="22">Class 2A D2</option>
          <option value="11">Class 1A D1</option>
          <option value="12">Class 1A D2</option>
          <option value="7">ALL TEAMS</option>
        </>
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
        <div className="class-div-select">
          <label className="text-desc">Change Classification:</label>
          <select className="dropdown" onChange={evt => this.handleCurrentClass(evt.target.value)}>
            {this.renderOptions()}
          </select>
        </div>

        {this.state.currentClass > 6 && this.state.view === 'district' ? null : (
          <p className="text-desc">Total Teams: {<span className="total-number">{this.state.currentlyDisplayingTeams.length}</span>}</p>
        )}

        {this.renderView()}
        <Footer />
      </>
    );
  }
}

export default App;
