import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { fetchInterviewee } from './utils'
import asyncComponent from './components/asyncComponent'

const home = () => import('./components/Home')
const invitationCard = () => import('./components/InvitationCard')

export default class extends React.Component {
  
  state = {
    interviewees: [],
    selectedInterviewee: {}
  }

  handleSelectInterviewee = (selectedInterviewee, cb) => {
    this.setState(prevState => Object.assign({}, prevState, { selectedInterviewee }), cb)
  }

  async componentWillMount() {
    try {
      const interviewees = await fetchInterviewee()
      this.setState(prevState => Object.assign({}, { interviewees }))
    } catch (err) {
      console.error(err)
    }
  }
 
  render() {
    const { state, props, handleSelectInterviewee } = this
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            component={routeProps => asyncComponent(home, { handleSelectInterviewee, ...state, ...props, ...routeProps })} />
          <Route
            path="/invitation-card"
            component={routeProps => asyncComponent(invitationCard, { ...state, ...props, ...routeProps })} />
        </div>
      </BrowserRouter>
    )
  }
}