import axios from "axios";

const API_URL = "http://localhost:5555/";

class AuthService {

    login(username, password) {
        return axios
            .post(API_URL + "auth/auth", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    // register(username, email, password) {
    //     return axios.post(API_URL + "auth/register", {
    //         username,
    //         email,
    //         password,
    //     });
    // }
}
export default new AuthService();