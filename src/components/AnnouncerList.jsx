import React from 'react'

import { capitalize } from '../utils'

export default function AnnouncerList({ showedAnnouncers, queryName, major }) {
  major = capitalize(major)
  return (
    <div>
      {(showedAnnouncers.length > 0)
        ? showedAnnouncers.map(({ firstName, lastName, major, interviewRef }) => (
          <div key={interviewRef}>
            <div>{interviewRef} {firstName} {lastName}</div>
            <div>Major: {capitalize(major)}</div>
          </div>))
        : <h1 style={{color: 'red'}}>{`Can't find the name "${queryName}" in Major: "${major}"!`}</h1>}
    </div>
  )
 }