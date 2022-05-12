import axios from "axios";

const instance = axios.create({
    baseURL:'/'
});

// instance.defaults.headers.common['Authorisation'] = 'Auth from instance'

export default instance;