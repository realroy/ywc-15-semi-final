import React from 'react'

export default function SearchBar({ handleChange, handleReset, queryName }) {
  return (
    <form className="outline bg-white center pa4 mb4" onChange={handleChange}>
      <fieldset className="cf bn ma0 pa0">
        <legend className="pa0 f5 f4-ns mb3 black-80 b">SEARCH</legend>
        <div className="cf">
          <input
            className="f6 f5-l input-reset ba fl black-80 pa3 b--black-10 w-100 w-75-m w-80-l br2-ns br--left-ns"
            type="text"
            id="input-query-name"
            value={queryName}
            placeholder="Type name to search..."/>
          <button 
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-red hover-bg-dark-red white pointer w-100 w-25-m w-20-l b br2-ns br--right-ns"
            onClick={handleReset}>RESET</button> 
        </div>
      </fieldset>
    </form>
  )
}