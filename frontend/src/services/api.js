import axios from "axios";

const BASE_URL = "http://192.168.0.183:8080";
const token = localStorage.getItem("token")

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  config: config
});

if(token)
  api.defaults.headers.common["Authorization"] = localStorage.getItem("token")

const fetchChatList = async (userId) => {
  const response = await api.get(`/${userId}/chats`);
  return response.data;
};

const fetchChatMessages = async (chatId) => {
  const response = await api.get(`/${chatId}/messages`)
  return response.data 
}

const saveMessage = async (message) => {
  const response = await api.post("/messages", message)
  return response.data
}

const sendLogin = async (user) => {
  const response = await api.post("/login", user)
  return response.data
}

export default {
  
  getChatList: async (userId) => {
    return await fetchChatList(userId)
  },
  
  getChatMessages: async (chatId) => {
    return await fetchChatMessages(chatId)
  },

  postMessage: async (message) => {
    return await saveMessage(message)
  }, 

  sendLogin: async (user) => {
    return await sendLogin(user)
  }
}