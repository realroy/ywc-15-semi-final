import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { fetchInterviewee } from './utils'
import asyncComponent from './components/asyncComponent'

const home = () => import('./components/Home')
const invitationCard = () => import('./components/InvitationCard')

export default class extends React.Component {
  
  state = {
    interviewees: [],
    selectedInterviewee: {
      major: '',
      interviewRef: '',
      name: ''
    }
  }

  handleSelectInterviewee = (selectedInterviewee, cb) => {
    this.setState(prevState => Object.assign({}, prevState, { selectedInterviewee }), cb)
  }

  findByInterviewRef = async (interviewRef, cb) => {
    await this.updateInterviewees()
    const { major, firstName, lastName } = this.state.interviewees.find(interviewee => interviewee.interviewRef === interviewRef)
    const selectedInterviewee = { major, interviewRef, name: `${firstName} ${lastName}`}
    this.setState(prevState => Object.assign({}, prevState, { selectedInterviewee }))
  }

  updateInterviewees = async () => {
    try {
      if(this.state.interviewees.length === 0) {
        const interviewees = await fetchInterviewee()
        this.setState(prevState => Object.assign({}, { interviewees }))
      }  
    } catch (err) {
      console.error(err)
    }
  }

  async componentWillMount() {
    await this.updateInterviewees()
  }
 
  render() {
    const { state, props, handleSelectInterviewee, findByInterviewRef } = this
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            component={routeProps => asyncComponent(home, { handleSelectInterviewee, ...state, ...props, ...routeProps })} />
          <Route
            path="/invitation-card/:interviewRef"
            component={routeProps => asyncComponent(invitationCard, { findByInterviewRef,...state, ...props, ...routeProps })} />
        </div>
      </BrowserRouter>
    )
  }
}