import axiosInstance from "../axios";

// Get messages by ID
export const getMessages = (id) => {
  return axiosInstance('UserToken').get(`/message/${id}`);
};

// Add a message
export const addMessage = (data) => {
  return axiosInstance('UserToken').post('/message/', data);
};
