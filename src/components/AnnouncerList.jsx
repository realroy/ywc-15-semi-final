import React from 'react'

import {majors} from '../configs'
import {capitalize} from '../utils'

function NotFoundRow({ queryName }) {
  return (
    <tr>
      <td>{`No results for "${queryName}"`}</td>
    </tr>
  )
}

function NormalRow({firstName, lastName, major, interviewRef}) {
  const cssClass = {
    rim: `pv1 ph3 pa3-ns bb b--black-20 w-10-l white sans-serif fw9 bg-${majors[major].color}`,
    normal: "pv1 ph3 pa3-ns bb b--black-20"
  } 
  return (
    <tr>
      <td className={cssClass.rim}>{major.toUpperCase()}</td>
      <td className={cssClass.normal}>{firstName} {lastName} ({interviewRef})</td>
    </tr>

  )
}

export default function AnnouncerList({showedAnnouncers, queryName, major }) {
  return (
    <table className={`ba br4-ns tc f6 f3-ns mt3 chonburi overflow-hidden w-100 bg-white black`} cellSpacing="0">
      <tbody className="lh-copy">
        {(showedAnnouncers.length > 0)
          ? showedAnnouncers.map(announcer => <NormalRow key={announcer.interviewRef} {...announcer}/>)
          : <NotFoundRow queryName={queryName} />}
      </tbody>
    </table>
  )
}