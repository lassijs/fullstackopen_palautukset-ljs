import { useState } from 'react'

const NewPerson = ({onSubmit, name, onNameChange, number, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({filter, onChange}) => {
  return (
    <>
      filter: <input value={filter} onChange={onChange} />
    </>
  )
}

const Persons = ({persons, filter}) => {
    const showList = persons.filter(person => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) return person
  })

  return (
    <>
      {showList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Matti Peso', number: '040-9834572'},
    { name: 'Aino Mainio', number: '39-2636450'},
    { name: 'Elli Kettunen', number: '044-0182374'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(name => name.name === newName)) {
      alert(`${newName} already exists!`)
      return 0
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add new</h3>
      <NewPerson 
        onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Filter value={filter} onChange={handleFilterChange} />
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App