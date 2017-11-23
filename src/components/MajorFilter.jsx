import React from 'react'

import { majors } from '../configs'

export default function MajorFilter({ handleClick }) {
  return (
    <div className="dn di-m di-l">
      <div className="cf">
        {Object.keys(majors).map(key => (
          <div key={majors[key].major} className="fl w-100 w-25-ns">
            <button
              key={`btn-${key}`}
              className={`fw9 w-100 bg-white bn pa3 b ${majors[key].color} ${majors[key].hover}`}
              id={key}
              onClick={handleClick}>
              {key.toUpperCase()}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}