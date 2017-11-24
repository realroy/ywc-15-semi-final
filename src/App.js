import React, {Component} from 'react'

import AnnouncerList from './components/AnnouncerList'
import FloatButton from './components/FloatButton'
import MajorFilter from './components/MajorFilter'
import ModalBox from './components/ModalBox'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'

import {fetchAnnouncers, filterByName, filterByMajor} from './utils'

import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    selectedAnnouncer: {
      interviewRef: '',
      name: '',
      major: ''
    },
    isModalDisplay: false,
    isNavbarDisplay: false,
    isFloatButtonDisplay: false,
    major: 'all',
    announcers: [],
    showedAnnouncers: [],
    queryName: ''
  }

  handleSelectAnnouncer = e => {
    const data = e.target.parentNode.id.split('-')
    const selectedAnnouncer = {
      name: `${data[0]} ${data[1]}`,
      major: data[2],
      interviewRef: data[3]
    }
    this.setState(prevState => Object.assign({}, prevState, { selectedAnnouncer }))
    this.handleToggleModal()
  }

  handleToggleModal = () => this.setState(prevState => Object.assign({}, prevState, { isModalDisplay: !prevState.isModalDisplay }))

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
      document.onkeydown = (evt = window.event) => {
        if (evt.keyCode === 27 && this.state.isModalDisplay) this.handleToggleModal()
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {major, announcers, showedAnnouncers, queryName, isFloatButtonDisplay, isNavbarDisplay, selectedAnnouncer, isModalDisplay } = this.state
    return (
      <div className="">
        <ModalBox {...selectedAnnouncer} isDisplay={isModalDisplay} handleClose={this.handleToggleModal} />
        <FloatButton isDisplay={isFloatButtonDisplay}/>
        <NavBar
          isDisplay={isNavbarDisplay}
          major={major}
          queryName={queryName}
          handleReset={this.handleReset}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleSelect={this.handleSelect}/>
        <header className="tc bg-black mt6">
          <img src={logo} className="dn di-ns h4 mt4" alt="logo"/>
          <div className="bg-dark-red f3-ns lh-title">
            <h1 className="lh-copy white tracked-tight sans-serif">SEMI FINAL ROUND</h1>
          </div>
        </header>
        <div className="flex justify-center mb4-ns mb2 mh2 mh4-ns">
          <div className="w-100">
            <SearchBar
              handleChange={this.handleChange}
              handleReset={this.handleReset}
              queryName={queryName}/>
            <MajorFilter handleClick={this.handleClick}/>
            {announcers.length === 0
              ? <h1 className="tc">Now Loading...</h1>
              : <AnnouncerList
                handleToggleModal={this.handleSelectAnnouncer}
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
