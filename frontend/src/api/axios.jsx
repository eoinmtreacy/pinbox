import axios from 'axios'

export default axios.create({
    baseURL: '/backend',
    headers: {
        'Content-type': 'application/json'
    }
})
