import axios from 'axios'
// import Config from 'react-native-config'
// Config.API_URL  // 'https://myapi.com'
const api = axios.create({
    baseURL: "https://api.alukey.com.br"
});
export default api;