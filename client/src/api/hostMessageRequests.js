import axiosInstance from "../axios";

// Get host messages by ID
export const getHostMessages = (id) => {
  return axiosInstance('HostToken').get(`/host/message/${id}`);
};

// Add a host message
export const addHostMessage = (data) => {
  return axiosInstance('HostToken').post('/host/message/', data);
};
