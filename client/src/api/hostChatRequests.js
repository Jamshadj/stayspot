import axiosInstance from "../axios";

// Create a host chat
export const createHostChat = (data) => {
  return axiosInstance('HostToken').post('/host/chat', data);
};

// Get host chats by host ID
export const getHostChats = (id) => {
  return axiosInstance('HostToken').get(`/host/chat/${id}`);
};

// Find a host chat by user ID and host ID
export const findHostChat = (userId, hostId) => {
  return axiosInstance('HostToken').get(`/host/chat/find/${userId}/${hostId}`);
};
