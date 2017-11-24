import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './components/Home'
import InvitationCard from './components/InvitationCard'

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/invitation-card/:interviewRef" component={InvitationCard} />
    </div>
  </BrowserRouter>
)