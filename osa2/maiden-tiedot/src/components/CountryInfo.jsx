const FullCountryInfo = ({country}) => {
  const languages = Object.entries(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(i => <li key={i[0]}>{i[1]}</li>)}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

export default FullCountryInfo