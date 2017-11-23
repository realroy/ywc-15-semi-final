import React, {Component} from 'react'

import AnnouncerList from './components/AnnouncerList'
import FloatButton from './components/FloatButton'
import MajorFilter from './components/MajorFilter'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'

import {fetchAnnouncers, filterByName, filterByMajor} from './utils'

import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    isNavbarDisplay: false,
    isFloatButtonDisplay: false,
    major: 'all',
    announcers: [],
    showedAnnouncers: [],
    queryName: ''
  }

  handleChange = e => {
    const queryName = e.target.value
    this.setState(prevState => Object.assign({}, prevState, {queryName}))
    this.updateShowedAnnouncers(this.state.major, e.target.value)
  }

  handleClick = e => this.changeMajor(e.target.id)

  changeMajor = (major = 'all') => {
    this.setState(prevState => Object.assign({}, prevState, {major}))
    this.updateShowedAnnouncers(major, this.state.queryName)
  }

  handleSelect = e => this.changeMajor(e.target.value)

  handleReset = e => {
    e.preventDefault()
    this.setState(prevState => Object.assign({}, prevState, {
      major: 'all',
      queryName: ''
    }))
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

  shouldNavbarShow = () => window.scrollY >= 500 || window.screen.width < 768

  async componentWillMount() {
    try {
      const announcers = await fetchAnnouncers()
      await this.setState(prevState => Object.assign({}, prevState, {announcers}))
      await this.updateShowedAnnouncers()
      document.addEventListener("scroll", () => this.setState(prevState => Object.assign({}, prevState, {
        isFloatButtonDisplay: !this.isOnTop(),
        isNavbarDisplay: this.shouldNavbarShow()
      })))
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {major, announcers, showedAnnouncers, queryName, isFloatButtonDisplay, isNavbarDisplay} = this.state
    return (
      <div className="">
        <FloatButton isDisplay={isFloatButtonDisplay}/>
        <NavBar
          isDisplay={isNavbarDisplay}
          major={major}
          queryName={queryName}
          handleReset={this.handleReset}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleSelect={this.handleSelect}/>
        <header className="tc bg-black">
          <img src={logo} className="dn di-ns h4 mt4" alt="logo"/>
          <div className="bg-dark-red f3-ns lh-title">
            <h1 className="lh-copy white tracked-tight sans-serif">SEMI FINAL ROUND</h1>
          </div>
        </header>
        <div className="flex justify-center mb4">
          <div className="w-100 mh4">
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
                queryName={queryName} />}
          </div>
        </div>

      </div>
    );
  }
}

export default App
