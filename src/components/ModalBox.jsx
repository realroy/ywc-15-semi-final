import React from 'react'

import { majors } from '../configs' 
import closeIcon from '../close.svg'

export default function ModalBox ({ major, name, interviewRef, isDisplay, handleClose }) {
  const bgColor = majors[major] ? majors[major].color : ''
  const fontColor = major === majors.design.major ? 'black' : 'white'
  return isDisplay ? (
    <div id="modal-box" className={`fixed dt h-100 w-100 tc bg-${bgColor} ${fontColor}`}>
      <button onClick={handleClose} 
        className="button-reset bn absolute pointer mh2 mt2 h2 w2 br-100 dim bg-white">
        <img src={closeIcon} alt="close-btn"/>
      </button>
      <div className="dtc v-mid">
        <div className={`mh1 mh6-ns pv3 pv6-ns w-100-ns ba b--${fontColor} br1`}>
         <header >
          <h2 className="f6 ttu tracked mb2 lh-title fw9">{interviewRef}</h2>
        </header>
        <h1 className="f3 f1-ns f-headline-l fw1 i">{name}</h1>
        <hr className={`bb w-60 w-80-ns b--${fontColor}`} />
        <blockquote className="ph0 mt4 mh0 measure f4 lh-copy center">
          <cite className="f6 ttu tracked fs-normal fw9 ">WEB {major.toUpperCase()} @ Young Webmaster Camp #15</cite>
        </blockquote>
        </div>
       
      </div>
    </div>
    // <div id="modal-box" className="bg-white black fixed w-100 h-100">
    //   <button onClick={handleClose}>Close</button>
    //   {major} - {name}({ interviewRef })
    // </div>
  ) : ''
}