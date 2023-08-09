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
  console.log(propertyId,userId,"xds");
  return axios.post('/addToWishList',{propertyId,userId});
};
export const removeFromWishList = (propertyId,userId) => {
  console.log(propertyId,userId,"xds");
  return axios.post('/removeFromWishList',{propertyId,userId});
};

export const getWishlist = (propertyId,userId) => {
  console.log(propertyId,userId,"xds");
  return axios.get('/getWishList',{propertyId,userId});
};

export const getWishlists = (userId) => {
  console.log(userId,"ded");
  return axios.get(`/getWishLists/${userId}`);
};
export const getMatchingListings = (coordinates) => {
  console.log(coordinates, "ded");
  return axios.get('/getMatchingListings', { params: { coordinates } });
};

export const updateDetails = async (userId,details) => {
  console.log(details, "ded");
  return axios.post(`/updateDetails/${userId}`, { details }); // Assuming you have the user's id available
};

export const getReservationById = async (userId) => {
  return axios.get(`/getReservations/${userId}`); // Assuming you have the user's id available
};





