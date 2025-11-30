import { useState, useEffect } from 'react'
import requests from './services/requests'
import Notification from './components/Notifications'


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


const Persons = ({persons, filter, onDelete}) => {
    const showList = persons.filter(person => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) return person
  })

  return (
    <>
      {showList.map(person => 
        <p key={person.name}>
          {person.name} {person.number} <button onClick={() => onDelete(person)}>Delete</button>
        </p>)}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('error') // Used as className for notification

  useEffect(() => {
    requests.getAll()
      .then(all => setPersons(all))
  }, [])

  const displayNotification = (message, type) => {
    setNotificationType(type)
    setNotification(message)

    setTimeout(() => {
      setNotificationType('')
      setNotification(null)
    }, 5000);
  }

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

    const newPerson = {
      name: newName,
      number: newNumber
    }

    // If person already exists...
    if (persons.some(name => name.name === newName)) {
      const matchingPerson = persons.find(p => p.name === newName)
      // Ask user to update phone number
      if (window.confirm(`${newName} already exists. Update phone number?`)) {
        requests.updatePerson(matchingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            displayNotification(`Phone number for ${newName} updated`, 'success')
          })
          .catch(error => {
            displayNotification(`${newName} has already been deleted from the server`, 'error')
            setPersons(persons.filter(p => p.id !== matchingPerson.id))
          })
      }
    }
    // If not, add a new person...
    else {
      requests.addNew(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        displayNotification(`${newName} added`, 'success')
      })
    }
  }


  const deletePerson = ({name, id}) => {
    if (window.confirm(`Confirm deletion of ${name}?`)) {
      const newPersons = persons.filter(n => n.id !== id)
        requests.deletePerson(id)
          .then(() => {
                setPersons(newPersons)
                displayNotification(`${name} has been deleted`, 'success')
          })
    }
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
      <Notification message={notification} type={notificationType}/>

      <h3>Numbers</h3>

      <Filter value={filter} onChange={handleFilterChange} />
      <Persons persons={persons} filter={filter} onDelete={deletePerson}/>
    </div>
  )
}

export default App