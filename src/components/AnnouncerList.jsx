import React from 'react'

import { majors } from '../configs'
import { capitalize } from '../utils'

export default function AnnouncerList({ showedAnnouncers, queryName, major }) {
  let bgColor, fadedColor, fontColor
  if (!majors[major]) {
    bgColor = 'bg-white black'
    fadedColor = 'black-70'
    fontColor = 'black'
  } else {
    bgColor = `bg-${majors[major].color} white`
    fadedColor = 'near-white'
    fontColor = 'white'
  }
  return (
    <div className="flex flex-wrap">
      {(showedAnnouncers.length > 0)
        ? showedAnnouncers.map(({ firstName, lastName, major, interviewRef }) => (
            <article key={interviewRef} className={`w-30-l mt3 pa2 ml2-l center ${bgColor} ${fontColor} b--black-10`}>
              <div className="tc">
                <h1 className="f4">{interviewRef} {firstName} {lastName}</h1>
                <hr className="mw3 bb bw1 b--black-10" />
              </div>
              <p className={`tc lh-copy measure center f6 ${fadedColor}`}>{capitalize(major)}</p>
          </article>))
        : <h1 className="tc red">
            {`Can't find name "${queryName}" in ${ (!majors[major]) ? 'any major' : capitalize(major) }!`}
          </h1>}
    </div>
  )
 }