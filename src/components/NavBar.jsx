import React from 'react'

import {majors} from '../configs'
import {capitalize} from '../utils'

export default function NavBar({
  major,
  queryName,
  handleClick,
  handleSelect,
  handleChange,
  handleReset,
  isDisplay
}) {
  return isDisplay
    ? (
      <header className="ma0 top-0 bg-black fixed w-100 ph3 pv3">
        <nav className="mh3-ns f6 fw6 ttu tracked">
          <div className="flex flex-wrap">
            <form className="flex w-100" onChange={handleChange}>
              <input
                className="w-100 f6 input-reset bn fl black-80 bg-white pa2 lh-solid br2 br--left"
                type="text"
                placeholder="Type Name, Interview reference to search..."
                value={queryName}/>
              <button
                className="f6 f4-ns button-reset fw9 fl pa2 tc bn bg-animate bg-dark-red hover-bg-red white pointer br2 br--right"
                onClick={handleReset}
                value="RESET">RESET</button>
            </form>
            <select
              className="dn-ns mt3 w-100"
              id="major-select"
              value={major}
              onChange={handleSelect}>
              <option value="all">All Majors</option>
              {Object
                .keys(majors)
                .map(key => <option key={key} value={key}>{capitalize(key)}</option>)}
            </select>
          </div>
          <div className="dn di-ns mt3 f4 cf w-100">
            {Object
              .keys(majors)
              .map(key => (
                <div
                  key={key}
                  id={key}
                  onClick={handleClick}
                  className={`w-25 fl mt3 pointer tc sans-serif fw9 bg-${majors[key].color} ${key === majors.design.major
                  ? 'black'
                  : 'white'} pa1 ph3`}>
                  {key.toUpperCase()}
                </div>
              ))}
          </div>
        </nav>
      </header>
    )
    : ''
}