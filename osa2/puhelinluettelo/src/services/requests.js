import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(personsUrl)
    return request.then(response => response.data)
}

const addNew = (newObject) => {
    const request = axios.post(personsUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${personsUrl}/${id}`)
    return request
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${personsUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, addNew, deletePerson, updatePerson}