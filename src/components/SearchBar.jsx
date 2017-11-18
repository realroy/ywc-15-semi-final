import React from 'react'

export default function SearchBar({ handleChange, handleReset, queryName }) {
  return (
    <form onChange={handleChange}>
      <input
        type="text"
        id="input-query-name"
        value={queryName}
        placeholder="Type name to search..."/>
      <button onClick={handleReset}>Reset</button>
    </form>
  )
}