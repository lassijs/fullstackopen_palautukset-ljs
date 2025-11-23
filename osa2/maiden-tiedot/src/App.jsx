import { useState, useEffect } from 'react'
import getAll from './services/requests'
import SearchResults from './components/SearchResults'


const CountrySearch = ({searchInput, onChange}) => {
  return (
    <div>
      <label htmlFor="countrySearch">Find countries: </label>
      <input id='countrySearch' value={searchInput} onChange={onChange}></input>
    </div>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    getAll().then(data => setAllCountries(data))
  }, [])

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleSelectButton = (event) => {
    setSearchInput(event.target.name)
  }

  return (
    <>
      <h1>Country Information</h1>
      <CountrySearch searchInput={searchInput} onChange={handleInputChange} />

      <SearchResults
        search={searchInput}
        countries={allCountries}
        onSelectClick={handleSelectButton} />
    </>
  )
}

export default App
