import Axios from 'axios'
import Cookies from 'js-cookie'

let token = Cookies.get('token')

const instance = Axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export default instance