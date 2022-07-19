import axios from 'axios'
import {API_URL} from '../utils/config'

const apiInstance = axios.create({
    baseURL: API_URL
})

export default apiInstance