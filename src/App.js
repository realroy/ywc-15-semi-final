import React, {Component} from 'react'

import AnnouncerList from './components/AnnouncerList'
import FloatButton from './components/FloatButton'
import MajorFilter from './components/MajorFilter'
import SearchBar from './components/SearchBar'

import {fetchAnnouncers, filterByName, filterByMajor} from './utils'

import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    isFloatButtonDisplay: false,
    major: 'all',
    announcers: [],
    showedAnnouncers: [],
    queryName: ''
  }

  handleChange = e => {
    e.preventDefault()
    const queryName = e.target.value
    this.setState(prevState => Object.assign({}, prevState, {queryName}))
    this.updateShowedAnnouncers(this.state.major, queryName)
  }

  handleClick = e => {
    e.preventDefault()
    const major = e
      .target
      .id
      .split("-")[1]
    this.setState(prevState => Object.assign({}, prevState, {major}))
    this.updateShowedAnnouncers(major, this.state.queryName)
  }

  handleReset = e => {
    e.preventDefault()
    this.setState(prevState => Object.assign({}, prevState, { major: 'all', queryName: ''}))
    this.updateShowedAnnouncers()
  }

  updateShowedAnnouncers = (major = 'all', queryName = '') => {
    const announcerFilteredByMajor = filterByMajor(this.state.announcers, major)
    const nextState = {
      showedAnnouncers: filterByName(announcerFilteredByMajor, queryName)
    }
    this.setState(prevState => Object.assign({}, prevState, nextState))
  }

  isOnTop = () => window.scrollY === 0

  async componentWillMount() {
    try {
      const announcers = await fetchAnnouncers()
      await this.setState(prevState => Object.assign({}, prevState, {announcers}))
      await this.updateShowedAnnouncers()
      document.addEventListener(
        "scroll",
        () => this.setState(prevState => Object.assign({}, prevState, { isFloatButtonDisplay: !this.isOnTop() }))
      )
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {major, announcers, showedAnnouncers, queryName, isFloatButtonDisplay} = this.state
    return (
      <div className="">
        <FloatButton isDisplay={isFloatButtonDisplay}/>
        <header className="tc">
          <img src={logo} className="" alt="logo"/>
          <h1>SEMI FINAL ROUND</h1>
        </header>
        <div className="mt1 flex justify-center">
          <div className="w-80">
            <SearchBar
              handleChange={this.handleChange}
              handleReset={this.handleReset}
              queryName={queryName}/>
            <MajorFilter handleClick={this.handleClick}/>
              {announcers.length === 0
                ? <h1 className="tc">Now Loading...</h1>
                : <AnnouncerList
                  showedAnnouncers={showedAnnouncers}
                  major={major}
                  queryName={queryName}/>}
          </div>
        </div>

      </div>
    );
  }
}

export default App
