import React from 'react'

import arrow from '../imgs/arrow.svg'

const handleClick = e => {
  const a = 50
  const v0 = 1
  let t = 0
  const id = setInterval(frame, 30)
  function frame () {
    t++
    const s = (v0 * t) + ((1/2) * a * Math.pow(t, 2)) 
    if(window.scrollY === 0) clearInterval(id)
    else window.scrollTo(window.scrollX, window.scrollY - s)
  }
}

export default function FloatButton ({ isDisplay }) {
  return (
    isDisplay
      ? <button id="float-btn" onClick={handleClick}><img src={arrow} alt="back to top"/></button>
      : ''
  )
}