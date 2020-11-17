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
      selectClass: '',
      hamburgerClicked: false,
      isDesktop: false,
      currentClass: 0,
      currentDivision: 0,
      scrollPos: 0,
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
    const districts = [...new Array(32).keys()].map((i) => ++i);
    this.setState({ districts, view: 'classes', currentClass: 6, currentDivision: 1, selectClass: '61' });
  }

  getAllTeams() {
    axios.get('/api/teams').then((res) =>
      this.setState({ allTeamsClasses: res.data }, () => {
        this.handleCurrentClassTeams();
        this.handleCurrentDivisionTeams();
      })
    );
  }

  handleChangeView(view) {
    this.setState({ view }, () => {
      this.handleFilteredTeams();
      this.handleSelect();
    });
  }

  handleCurrentClass(classDivision) {
    const currentClass = Number(classDivision.slice(0, 1));
    const currentDivision = currentClass === 6 ? 1 : Number(classDivision.slice(1, 2));
    this.setState({ currentClass }, () => {
      this.handleCurrentClassTeams();
      this.setState({ currentDivision }, () => {
        this.handleCurrentDivisionTeams();
        this.handleSelect();
      });
    });
  }

  handleCurrentClassTeams() {
    const { allTeamsClasses, currentClass } = this.state;
    const currentClassTeams = allTeamsClasses
      .filter((team) => team.class === currentClass)
      .sort((a, b) => (a.city ? a.city : a.school) - (b.city ? b.city : b.school));
    this.setState({ currentClassTeams });
  }

  handleCurrentlyDisplayingTeams() {
    const { searchInput, currentClass, view, currentClassTeams, filteredTeams, allTeamsClasses, currentDivisionTeams } = this.state;
    let currentlyDisplayingTeams;
    if (searchInput === '') {
      if (currentClass > 6) {
        if (view === 'districts') {
          currentlyDisplayingTeams = currentClassTeams;
        } else if (view === 'appearances') {
          currentlyDisplayingTeams = filteredTeams;
        } else {
          currentlyDisplayingTeams = allTeamsClasses;
        }
      } else {
        if (view === 'appearances') {
          currentlyDisplayingTeams = filteredTeams;
        } else {
          currentlyDisplayingTeams = currentDivisionTeams;
        }
      }
    } else {
      if (currentClass > 6 && view === 'districts') {
        currentlyDisplayingTeams = currentClassTeams;
      } else {
        currentlyDisplayingTeams = filteredTeams;
      }
    }
    this.setState({ currentlyDisplayingTeams });
  }

  handleCurrentDivision(currentDivision) {
    this.setState({ currentDivision }, this.handleCurrentDivisionTeams);
  }

  handleCurrentDivisionTeams() {
    const { allTeamsClasses, currentDivision, currentClass } = this.state;
    let currentDivisionTeams = allTeamsClasses
      .filter((team) => team.division === currentDivision && team.class === currentClass)
      .sort((a, b) => (a.city ? a.city : a.school - b.city ? b.city : b.school));
    this.setState({ currentDivisionTeams }, this.handleFilteredTeams);
  }

  handleFilteredTeams() {
    const { currentClass, view, currentClassTeams, allTeamsClasses, currentDivisionTeams, searchInput } = this.state;
    let currentTeams;
    if (currentClass > 6) {
      if (view === 'districts') {
        currentTeams = currentClassTeams;
      } else if (view === 'appearances') {
        currentTeams = allTeamsClasses.filter((team) => team.stateAppearances.length > 0);
      } else {
        currentTeams = allTeamsClasses;
      }
    } else {
      if (view === 'appearances') {
        currentTeams = currentClassTeams.filter((team) => team.stateAppearances.length > 0);
      } else {
        currentTeams = currentDivisionTeams;
      }
    }
    const filteredTeams = currentTeams.filter(
      (team) =>
        `${team.city.toLowerCase()} ${team.school.toLowerCase()} ${team.mascot.toLowerCase()}`.includes(searchInput.toLowerCase()) ||
        team.city.toLowerCase().includes(searchInput.toLowerCase()) ||
        team.school.toLowerCase().includes(searchInput.toLowerCase()) ||
        team.mascot.toLowerCase().includes(searchInput.toLowerCase())
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

  handleSelect() {
    const { view, currentClass, currentDivision } = this.state;
    let defaultVal;
    if (currentClass < 7) {
      if (view === 'appearances') {
        defaultVal = `${currentClass}1`;
      } else {
        defaultVal = `${currentClass}${currentDivision}`;
      }
    } else {
      defaultVal = '7';
    }
    this.setState({ selectClass: defaultVal });
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
    evt.target.style.transform = 'translateX(220px)';
    window.scrollTo(0, 0);
  }

  sort(a, b) {
    const { currentClass } = this.state;
    if (currentClass > 6) {
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
    const { currentlyDisplayingTeams, view, isDesktop, currentClass, currentDivision, districts } = this.state;
    let currentTeams = currentlyDisplayingTeams;
    if (view === 'classes') {
      return <ClassesView teams={currentTeams.sort(this.sort)} isDesktop={isDesktop} currentClass={currentClass} currentDivision={currentDivision} />;
    } else if (view === 'districts') {
      return (
        <DistrictView
          districts={districts}
          teams={currentTeams}
          isDesktop={isDesktop}
          currentClass={currentClass}
          currentDivision={currentDivision}
        />
      );
    } else if (view === 'enroll') {
      return <EnrollView teams={currentTeams.sort((a, b) => b.enrollment - a.enrollment)} isDesktop={isDesktop} currentClass={currentClass} />;
    } else if (view === 'appearances') {
      return (
        <StateAppearanceView teams={currentTeams.sort((a, b) => b.stateAppearances.length - a.stateAppearances.length)} currentClass={currentClass} />
      );
    }
  }

  renderOptions() {
    const { view } = this.state;
    if (view === 'appearances') {
      return (
        <>
          <option value="61">Class 6A</option>
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
          <option value="61">Class 6A</option>
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
    const { hamburgerClicked, searchInput, view, currentClass, currentlyDisplayingTeams, scrollPos, isDesktop, selectClass } = this.state;
    return (
      <>
        <Navbar
          handleChangeView={this.handleChangeView.bind(this)}
          handleSearchInput={this.handleSearchInput.bind(this)}
          handleHamburger={this.handleHamburger.bind(this)}
          hamburgerClicked={hamburgerClicked}
          searchInput={searchInput}
          view={view}
        />
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="&#x1F50D; Filter by city, school, mascot"
            value={searchInput}
            onChange={(evt) => this.handleSearchInput(evt.target.value)}
          />
          <span style={{ display: searchInput ? 'inline' : 'none' }} className="clear-search" onClick={this.resetSearchInput.bind(this)}>
            &#x2715;
          </span>
        </div>
        <div className="class-div-select">
          <label className="text-desc">Change Classification:</label>
          <select className="dropdown" value={selectClass} onChange={(evt) => this.handleCurrentClass(evt.target.value)}>
            {this.renderOptions()}
          </select>
        </div>

        {currentClass > 6 && view === 'district' ? null : (
          <p className="text-desc">Total Teams: {<span className="total-number">{currentlyDisplayingTeams.length}</span>}</p>
        )}

        {this.renderView()}
        <Footer />
        <div
          className="back-to-top"
          style={{ transform: scrollPos < 300 ? 'translateX(220px)' : 'translateX(0)' }}
          onClick={(evt) => this.backToTop(evt)}
        >
          {isDesktop ? 'Back to top ▲' : '▲'}
        </div>
      </>
    );
  }
}

export default App;
