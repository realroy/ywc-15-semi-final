import React from 'react'

import FloatButton from './FloatButton'
import MajorFilter from './MajorFilter'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import IntervieweeList from './IntervieweeList'
import logo from '../logo.png'
import {
  fetchInterviewee,
  filterByMajor,
  filterByNameAndInterviewRef,
  shouldShowFloatingBtn,
  shouldShowNavbar
} from '../utils'
import { initialState } from '../configs'

export default class Home extends React.Component {

  state = initialState

  handleChange = e => {
    const queryName = e.target.value
    this.setState(
      prevState => Object.assign({}, prevState, { queryName }),
      () => this.updateShowedInterviewees(this.state.major, queryName)
    )
  }

  handleClick = e => this.changeMajor(e.target.id)
  
  handleSelect = e => this.changeMajor(e.target.value)

  changeMajor = (major = initialState.major) => 
    this.setState(
      prevState => Object.assign({}, prevState, { major }),
      () => this.updateShowedInterviewees(major, this.state.queryName)
    )

  handleReset = e => {
    e.preventDefault()
    this.setState(
      prevState => Object.assign({}, prevState, { major: initialState.major, queryName: initialState.queryName}),
      () => this.updateShowedInterviewees()
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const { major, queryName } = this.state
    this.updateShowedInterviewees(major, queryName)
  }

  handleTdTagClick = e => this.props.history.push(`/invitation-card/${e.target.parentNode.id}`)

  updateShowedInterviewees = (major = initialState.major, queryName = initialState.queryName) => {
    const showedInterviewees = filterByNameAndInterviewRef(
      filterByMajor(this.state.interviewees, major),
      queryName
    )
    this.setState(prevState => Object.assign({}, prevState, { showedInterviewees }))
  }

  scrollListener = () => this.setState(prevState => Object.assign({}, prevState, {
    isFloatButtonDisplay: shouldShowFloatingBtn(),
    isNavbarDisplay: shouldShowNavbar()
  }))

  async componentWillMount() {
    try {
      const interviewees = await fetchInterviewee()
      this.setState(
        prevState => Object.assign({}, prevState, { interviewees }),
        () => this.updateShowedInterviewees()
      )
      window.$INTERVIEWEES = interviewees
      console.log(window.$INTERVIEWEES)
    } catch (err) {
      console.error(err)
    }
    document.addEventListener("scroll", this.scrollListener)
  }

  render() {
    const { interviewees, isFloatButtonDisplay, isNavbarDisplay, major,queryName, showedInterviewees} = this.state
    return (
      <div>
        <FloatButton isDisplay={isFloatButtonDisplay}/>
        <NavBar
          isDisplay={isNavbarDisplay}
          major={major}
          queryName={queryName}
          handleReset={this.handleReset}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleSelect={this.handleSelect}/>
        <Header />
        <div className="flex justify-center mb4-ns mb2 mh2 mh4-ns">
          <div className="w-100">
            <SearchBar
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleReset={this.handleReset}
              queryName={queryName}/>
            <MajorFilter handleClick={this.handleClick}/>
          {interviewees.length === 0
            ? <LoadingPlaceHolder />
            : <IntervieweeList
                handleClick={this.handleTdTagClick}
                showedInterviewees={showedInterviewees}
                major={major}
                queryName={queryName} />}
          </div>
        </div>
      </div>
    )
  }
}

const LoadingPlaceHolder = () => (
  <h1 className="tc">Now Loading... </h1>
)

const Header = () => (
  <header className="tc bg-black mt6 mt0-ns">
    <img src={logo} className="dn di-ns h4 mt4" alt="logo"/>
    <div className="bg-dark-red f3-ns lh-title">
      <h1 className="lh-copy white tracked-tight sans-serif">SEMI FINAL ROUND</h1>
    </div>
  </header>
)