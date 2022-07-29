import axios from "axios";

const GATEWAY_BASE_URL = "http://localhost:5555/";

class GatewayService {

    createAuth(Credentials) {
        return axios.post(GATEWAY_BASE_URL + "auth/auth", Credentials);
    }

}

export default new GatewayService()    