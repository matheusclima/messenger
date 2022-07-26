import axios from "axios";
//192.168.0.183

const BASE_URL = "http://192.168.0.183:8081";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
};

const api = axios.create({
  baseURL: BASE_URL,
  // config: config,
});

const fetchChatMessages = async (chatId) => {
    const response = await api.get(`/${chatId}/messages`)
    return response.data 
}

export default fetchChatMessages