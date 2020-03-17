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
      currentlyDisplayingTeams: [],
      currentDivisionTeams: [],
      districts: [],
      filteredTeams: [],
      searchInput: '',
      view: '',
      hamburgerClicked: false,
      isDesktop: false,
      currentClass: 0,
      currentDivision: 0,
      scrollPos: 0
    };

    this.sort = this.sort.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    this.initialValues();
    this.getAllTeams();
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    window.addEventListener('scroll', this.updateScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
    window.removeEventListener('scroll', this.updateScroll);
  }

  initialValues() {
    const districts = [...new Array(32).keys()].map(i => ++i);
    this.setState({ districts, view: 'classes', currentClass: 6, currentDivision: 1 });
  }

  getAllTeams() {
    axios.get('/local').then(res =>
      this.setState({ allTeamsClasses: res.data }, () => {
        this.handleCurrentClassTeams();
        this.handleCurrentDivisionTeams();
      })
    );
  }

  handleChangeView(view) {
    this.setState({ view }, this.handleFilteredTeams);
  }

  handleCurrentClass(classDivision) {
    const currentClass = Number(classDivision.slice(0, 1));
    const currentDivision = currentClass === 6 ? 1 : Number(classDivision.slice(1, 2));
    this.setState({ currentClass }, () => {
      this.handleCurrentClassTeams();
      this.setState({ currentDivision }, this.handleCurrentDivisionTeams);
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
          currentlyDisplayingTeams = this.state.currentDivisionTeams;
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
    this.setState({ currentDivision }, this.handleCurrentDivisionTeams);
  }

  handleCurrentDivisionTeams() {
    let currentDivisionTeams = this.state.allTeamsClasses
      .filter(team => team.division === this.state.currentDivision && team.class === this.state.currentClass)
      .sort((a, b) => (a.city ? a.city : a.school - b.city ? b.city : b.school));
    this.setState({ currentDivisionTeams }, this.handleFilteredTeams);
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

    this.setState({ filteredTeams }, this.handleCurrentlyDisplayingTeams);
  }

  handleHamburger() {
    const hamburgerClicked = !this.state.hamburgerClicked;
    this.setState({ hamburgerClicked });
  }

  handleSearchInput(searchInput) {
    this.setState({ searchInput }, this.handleFilteredTeams);
  }

  resetSearchInput() {
    this.setState({ searchInput: '' }, this.handleFilteredTeams);
  }

  updateWidth() {
    const isDesktop = window.innerWidth > 740;
    this.setState({ isDesktop });
  }

  updateScroll() {
    const scrollPos = document.documentElement.scrollTop;
    this.setState({ scrollPos });
  }

  backToTop(evt) {
    evt.target.style.transform = 'translateX(200px)';
    window.scrollTo(0, 0);
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
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="&#x1F50D; Filter by city, school, mascot"
            value={this.state.searchInput}
            onChange={evt => this.handleSearchInput(evt.target.value)}
          />
          <span style={{ display: this.state.searchInput ? 'inline' : 'none' }} className="clear-search" onClick={this.resetSearchInput.bind(this)}>
            &#x2715;
          </span>
        </div>
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
        <div
          className="back-to-top"
          style={{ transform: this.state.scrollPos < 300 ? 'translateX(200px)' : 'translateX(0)' }}
          onClick={evt => this.backToTop(evt)}
        >
          {this.state.isDesktop ? 'Back to top ▲' : '▲'}
        </div>
      </>
    );
  }
}

export default App;
