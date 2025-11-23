import FullCountryInfo from "./CountryInfo"

const SearchResults = ({search, countries, onSelectClick}) => {
  // If input is empty
  if (search === '') return null

  const filteredList = countries.filter(obj => {
    if (obj.name.common.toLowerCase().includes(search.toLowerCase())) return obj
    // When clicking Select button, search input will be changed to official name
    else if (obj.name.official.toLowerCase().includes(search.toLowerCase())) return obj
  })

  // If too many matching result
  if (filteredList.length > 10) {
    return (
      <p>Too many matches...</p>
    )
  }

  // If only one matching result
  else if (filteredList.length === 1) {
    const selectedCountry = filteredList[0]
    return (
      <FullCountryInfo country={selectedCountry} />
    )
  }

  // The other cases (between 2-10 results)
  return (
    <div>
      <p>Filtering by: {search}</p>
      <ol>
        {filteredList.map(country => <li key={country.cca3}>{country.name.common}
          <button name={country.name.official} onClick={onSelectClick}>Select</button></li>)}
      </ol>
    </div>
  )
}

export default SearchResults