import React from 'react'

export default function SearchBar({ handleChange, handleReset, queryName }) {
  return (
    <form className="bg-white center pa4 dn db-ns" onChange={handleChange}>
      <fieldset className="cf bn ma0 pa0">
        <legend className="pa0 f4-ns mb3 black b sans-serif">SEARCH</legend>
        <div className="cf">
          <input
            className="f5 input-reset ba fl black-80 pa3 b--black-10 w-80 br2 br--left"
            type="text"
            id="input-query-name"
            value={queryName}
            placeholder="Type Name, Interview reference to search..."/>
          <button 
            className="f5 button-reset fl pv3 tc bn bg-animate bg-dark-red hover-bg-red white pointer w-20 b br2 br--right"
            onClick={handleReset}>RESET</button> 
        </div>
      </fieldset>
    </form>
  )
}