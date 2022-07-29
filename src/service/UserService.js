import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5555/core/api/v1/';

class UserService {

    // getUserEvents() {
    //     return axios.get(API_URL + 'events');
    // }

    getUserEvents() {
        return axios.get(API_URL + 'events', { headers: authHeader() });
    }

    // getModeratorBoard() {
    //     return axios.get(API_URL + 'mod', { headers: authHeader() });
    // }

    // getAdminBoard() {
    //     return axios.get(API_URL + 'admin', { headers: authHeader() });
    // }

}
export default new UserService();