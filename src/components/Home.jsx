import React from 'react'
import { Helmet } from 'react-helmet'

import FloatButton from './FloatButton'
import MajorFilter from './MajorFilter'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import IntervieweeList from './IntervieweeList'
import Loading from './Loading'
import logo from '../logo.png'
import {
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

  handleTdTagClick = e => {
    const data = e.target.parentNode.id.split('-')
    const interviewRef = data[0]
    const major = data[1]
    const firstName = data[2]
    const lastName = data[3]
    const name = `${firstName} ${lastName}`
    this.props.handleSelectInterviewee({ interviewRef, major, name }, this.props.history.push('/invitation-card'))
  }

  updateShowedInterviewees = (major = initialState.major, queryName = initialState.queryName) => {
    const showedInterviewees = filterByNameAndInterviewRef(
      filterByMajor(this.props.interviewees, major),
      queryName
    )
    this.setState(prevState => Object.assign({}, prevState, { showedInterviewees }))
  }

  scrollListener = () => this.setState(prevState => Object.assign({}, prevState, {
    isFloatButtonDisplay: shouldShowFloatingBtn(),
    isNavbarDisplay: shouldShowNavbar()
  }))

  componentDidMount() {
    this.updateShowedInterviewees()
    document.addEventListener("scroll", this.scrollListener)
  }

  render() {
    const { isFloatButtonDisplay, isNavbarDisplay, major,queryName, showedInterviewees} = this.state
    return (
      <div>
        <Helmet>
          <meta property="og:url"           content="https://oroy-ywc15-semi-final.herokuapp.com/" />
          <meta property="og:type"          content="article" />
          <meta property="og:title"         content="YWC#15 Semi Final Round" />
          <meta property="og:description"   content="Announcement Of Applicants Qualified For The Interview" />
          <meta property="og:image"         content="https://oroy-ywc15-semi-final.herokuapp.com/preview-page.png" />
          <title>YWC#15 Semi Final Round</title>
        </Helmet>
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
          {this.props.interviewees.length === 0
            ? <Loading />
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


const Header = () => (
  <header className="tc bg-black mt6 mt0-ns">
    <img src={logo} className="dn di-ns h4 mt4" alt="logo"/>
    <div className="bg-dark-red f3-ns lh-title">
      <h1 className="lh-copy white tracked-tight sans-serif">SEMI FINAL ROUND</h1>
    </div>
  </header>
)