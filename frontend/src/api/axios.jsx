import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:80/backend',
    headers: {
        'Content-type': 'application/json'
    }
})
