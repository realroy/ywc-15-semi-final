import React, {Component} from 'react'

import AnnouncerList from './components/AnnouncerList'
import MajorFilter from './components/MajorFilter'
import SearchBar from './components/SearchBar'

import { fetchAnnouncers,filterByName, filterByMajor } from './utils'

import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    major: 'all',
    announcers: [],
    showedAnnouncers: [],
    queryName: ''
  }

  handleChange = e => {
    e.preventDefault()
    const queryName = e.target.value
    this.setState(prevState => Object.assign({}, prevState, { queryName }))
    this.updateShowedAnnouncers(this.state.major, queryName)
  }
  
  handleClick = e => {
    e.preventDefault()
    const major = e.target.id.split("-")[1]
    this.setState(prevState => Object.assign({}, prevState, { major }))
    this.updateShowedAnnouncers(major, this.state.queryName)
  }
  
  handleReset = e => {
    e.preventDefault()
    this.setState(prevState => Object.assign({}, prevState, { queryName: '' }))
    this.updateShowedAnnouncers()
  }
  
  updateShowedAnnouncers = (major = 'all', queryName = '') => {
    const announcerFilteredByMajor = filterByMajor(this.state.announcers, major)
    const nextState = { showedAnnouncers: filterByName(announcerFilteredByMajor, queryName) }
    this.setState(prevState => Object.assign({}, prevState, nextState))
  }

  async componentWillMount() {
      try {
        const announcers = await fetchAnnouncers()
        await this.setState(prevState => Object.assign({}, prevState, { announcers }))
        await this.updateShowedAnnouncers()
      } catch (err) {
        console.error(err)
      }
  }

  render() {
    console.log(this.state)
    const { major, announcers, showedAnnouncers, queryName } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Semi Final Round</h1>
        </header>
        <SearchBar
          handleChange={this.handleChange}
          handleReset={this.handleReset}
          queryName={queryName} />
        <MajorFilter handleClick={this.handleClick} />
        {announcers.length === 0
          ? <h1>Now Loading...</h1>
          : <AnnouncerList
              showedAnnouncers={showedAnnouncers}
              major={major}
              queryName={queryName} />}
      </div>
    );
  }
}

export default App