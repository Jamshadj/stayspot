import axiosInstance from "../axios";

// Create a chat
export const createChat = (data) => {
  return axiosInstance('UserToken').post('/chat/', data); // Making the POST request using axiosInstance with UserToken
};

// Get user chats by user ID
export const getUserChats = (id) => {
  return axiosInstance('UserToken').get(`/chat/${id}`);
};

// Find a chat by user ID and host ID
export const findChat = (userId, hostId) => {
  return axiosInstance('UserToken').get(`/chat/find/${userId}/${hostId}`);
};
