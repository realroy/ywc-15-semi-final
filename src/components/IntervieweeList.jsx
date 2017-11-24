import React from 'react'

import { majors } from '../configs'

function NotFoundRow({ queryName }) {
  return (
    <tr>
      <td>{`No results for "${queryName}"`}</td>
    </tr>
  )
}

function NormalRow({ firstName, lastName, major, interviewRef, handleClick }) {
  const cssClass = {
    rim: `pv1 tl tc-ns pa2 pa3-ns bb b--black-20 w-10-l ${majors[major].textColor} sans-serif fw9 bg-${majors[major].color}`,
    normal: "pv1 pa2 pa3-ns bb b--black-20 sans-serif"
  } 
  return (
    <tr id={interviewRef} onClick={handleClick}>
      <td className={cssClass.rim}>{major.toUpperCase()}</td>
      <td className={cssClass.normal}>{firstName} {lastName} ({interviewRef})</td>
    </tr>
  )
}

export default function IntervieweeList({ showedInterviewees, queryName, major, handleClick }) {
  return (
    <table className={`bn br4-ns tc f6 f3-ns mt3 serif overflow-hidden w-100 bg-white black`} cellSpacing="0">
      <tbody className="lh-copy">
        {showedInterviewees.length > 0
          ? showedInterviewees.map(interviewee => <NormalRow key={interviewee.interviewRef} handleClick={handleClick} {...interviewee} />)
          : <NotFoundRow queryName={queryName} />}
      </tbody>
    </table>
  )
}