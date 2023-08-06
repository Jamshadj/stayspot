import axios from "../axios";

export const postSignUp = (data) => {
  return axios.post('/signup', data);
};

export const postUserOtp = (otp, formData) => {
  return axios.post('/otp', { otp, ...formData });
};

export const postLogin = (data) => {
  return axios.post('/login', data);
};

export const loginWithGoogle = (data) => {
  return axios.post('/auth/login/google', data);
};

export const userLogout = () => {
  return axios.post('/logout');
};

export const getListings = (status) => {
  return axios.get('/getListings', { params: { status: status } });
};

export const getListingById = (propertyId) => {
  console.log(propertyId,'eded');
  return axios.get(`/getListingById/${propertyId}`);
};
export const getHostById = (hostId) => {
  console.log(hostId);
  return axios.get(`/getHostById/${hostId}`);
};
export const postCheckout = (details) => {
  return axios.post('/checkOut' ,details);
};
export const getBookingById = (id) => {
  console.log("iddd",id);
  return axios.get(`/booking?id=${id}`);
};

export const addToWishList = (propertyId,userId) => {
  return axios.post('/addToWishList',{propertyId,userId});
};


