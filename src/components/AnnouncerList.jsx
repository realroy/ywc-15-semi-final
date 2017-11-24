import React from 'react'

import {majors} from '../configs'

function NotFoundRow({ queryName }) {
  return (
    <tr>
      <td>{`No results for "${queryName}"`}</td>
    </tr>
  )
}

function NormalRow({firstName, lastName, major, interviewRef, handleToggleModal}) {
  const cssClass = {
    rim: `pv1 tl tc-ns pa2 pa3-ns bb b--black-20 w-10-l ${major === majors.design.major ? 'black' : 'white'} sans-serif fw9 bg-${majors[major].color}`,
    normal: "pv1 pa2 pa3-ns bb b--black-20"
  } 
  return (
    <tr id={`${firstName}-${lastName}-${major}-${interviewRef}`} onClick={handleToggleModal}>
      <td className={cssClass.rim}>{major.toUpperCase()}</td>
      <td className={cssClass.normal}>{firstName} {lastName} ({interviewRef})</td>
    </tr>

  )
}

export default function AnnouncerList({showedAnnouncers, queryName, major, handleToggleModal }) {
  return (
    <table className={`bn br4-ns tc f6 f3-ns mt3 serif overflow-hidden w-100 bg-white black`} cellSpacing="0">
      <tbody className="lh-copy">
        {(showedAnnouncers.length > 0)
          ? showedAnnouncers.map(announcer => <NormalRow key={announcer.interviewRef} handleToggleModal={handleToggleModal} {...announcer}/>)
          : <NotFoundRow queryName={queryName} />}
      </tbody>
    </table>
  )
}