import React from 'react'

export default function MajorFilter({ handleClick }) {
  return (
    <div>
      <button id="btn-all" onClick={handleClick}>Show All</button>
      <button id="btn-content" onClick={handleClick}>Content</button>
      <button id="btn-design" onClick={handleClick}>Design</button>
      <button id="btn-marketing" onClick={handleClick}>Marketing</button>
      <button id="btn-programming" onClick={handleClick}>Programming</button>
    </div>
  )
}