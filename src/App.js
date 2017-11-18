import React, {Component} from 'react'
import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    major: 'all',
    announcers: [],
    showed_announcers: [],
    queryName: ''
  }

  filterAnnouncersByName = (announcers = [], queryName = '') => (queryName === '')
    ? announcers
    : announcers.filter(a => a.firstName.includes(queryName) || a.lastName.includes(queryName))

  filterAnnouncersByMajor = (announcers = [], major = 'all') => (major === 'all')
    ? announcers
    : announcers.filter(a => a.major === major )

  handleClick = e => {
    e.preventDefault()
    const major = e.target.id.split("-")[1]
    this.setState(prevState => Object.assign({}, prevState, { major }))
    this.updateShowedAnnouncers(major, this.state.queryName)
  }

  handleChange = e => {
    e.preventDefault()
    const queryName = e.target.value
    this.setState(prevState => Object.assign({}, prevState, { queryName }))
    this.updateShowedAnnouncers(this.state.major, queryName)
  }

  updateShowedAnnouncers = (major = 'all', queryName = '') => {
    const announcerFilteredByMajor = this.filterAnnouncersByMajor(this.state.announcers, major)
    const nextState = { showed_announcers: this.filterAnnouncersByName(announcerFilteredByMajor, queryName) }
    this.setState(prevState => Object.assign({}, prevState, nextState))
  }

  componentDidMount() {
    fetch('announcement.json')
      .then(res => res.json())
      .then(announcers => this.setState(prevState => Object.assign({}, prevState, { announcers })))
      .then(this.updateShowedAnnouncers)
      .catch(console.error)
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Semi-Final Round</h1>
        </header>
        <div>
          <button id="btn-all" onClick={this.handleClick}>Show All</button>
          <button id="btn-content" onClick={this.handleClick}>Web Content</button>
          <button id="btn-design" onClick={this.handleClick}>Web Design</button>
          <button id="btn-marketing" onClick={this.handleClick}>Web Marketing</button>
          <button id="btn-programming" onClick={this.handleClick}>Web Programming</button>
        </div>
        <form onChange={this.handleChange}>
          <input type="text" id="input-query-name" value={this.state.queryName} placeholder="Type name to search..." />
        </form>
        <div>
          {(this.state.showed_announcers.length > 0)
            ? this.state.showed_announcers.map(({firstName, lastName, major}, i) => (
              <div key={i}>
                <div>Name: {firstName} {lastName}</div>
                <div>Major: {major[0].toUpperCase()+major.slice(1)}</div>
              </div>
            ))
            : <h1 style={{color: 'red'}}>{`Can't find the name "${this.state.queryName}" in Major: "${this.state.major}"!`}</h1>}
        </div>
      </div>
    );
  }
}

export default App