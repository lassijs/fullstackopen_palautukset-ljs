import axios from 'axios'

const dataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(dataUrl)
    return request.then(response => response.data)
}

export default getAll