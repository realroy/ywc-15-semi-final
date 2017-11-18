import React, {Component} from 'react'
import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    major: 'all',
    announcers: [],
    showed_announcers: [],
  }

  filterAnnouncersByMajor = (major = 'all') => this.state.announcers.filter(a => a.major === major )

  handleClick = e => {
    e.preventDefault()
    const major = e.target.id.split("-")[1]
    this.setState(prevState => Object.assign({}, prevState, { major }))
    this.updateShowedAnnouncers(major)
  }

  updateShowedAnnouncers = (major = 'all') => {
    const nextState = (major === 'all')
      ? { showed_announcers: this.state.announcers }
      : { showed_announcers: this.filterAnnouncersByMajor(major) }
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
        <div>
          {this.state.showed_announcers.map(({firstName, lastName, major}, i) => (
            <div key={i}>
              <div>Name: {firstName} {lastName}</div>
              <div>Major: {major[0].toUpperCase()+major.slice(1)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App