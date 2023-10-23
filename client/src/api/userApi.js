import axiosInstance from '../axios';

// User registration and authentication

// User registration - Sign up a user
export const postSignUp = (data) => {
  return axiosInstance('UserToken').post('/signup', data);
};

// User login
export const postLogin = (data) => {
  return axiosInstance('UserToken').post('/login', data);
};

// Login with Google
export const loginWithGoogle = (data) => {
  return axiosInstance.post('/auth/login/google', data);
};

// User logout
export const userLogout = () => {
  return axiosInstance('UserToken').post('/logout');
};

// Password management

// Request a password reset
export const postForgotPassword = (data) => {
  return axiosInstance('UserToken').post('/forgotpassword', { data });
};

// Verify OTP for password reset
export const postVerifyOtp = (data) => {
  return axiosInstance('UserToken').post('/verifyotp', { data });
};

// Update user password
export const postUpdatePassword = (data) => {
  return axiosInstance('UserToken').patch('/updatepassword', { data });
};

// Verify user OTP
export const postUserOtp = (otp, formData) => {
  return axiosInstance('UserToken').post('/otp', { otp, ...formData });
};

// User data retrieval and management

// Get user's reservations
export const getReservationById = async (userId) => {
  return axiosInstance('UserToken').get(`/getReservations/${userId}`);
};

// Get user's bookings
export const getBookingById = (id) => {
  return axios.get(`/booking?id=${id}`);
};

// Get user chats
export const userChats = async (id) => {
  return axiosInstance('UserToken').get(`/chat/${id}`);
};

// Get messages for a chat
export const getMessages = async (id) => {
  return axiosInstance('UserToken').get(`/chat/messages/${id}`);
};

// User profile management

// Update user details
export const updateDetails = async (userId, details) => {
  return axiosInstance('UserToken').post(`/updateDetails/${userId}`, { details });
};

// Update user profile
export const updateProfile = async (userId, details) => {
  return axiosInstance('UserToken').post(`/updateProfile/${userId}`, { details });
};

// Property and listing management

// Get property listings
export const getListings = (structure) => {
  // Only send the structure parameter if it's not null
  const params = structure ? { structure } : {};
  return axiosInstance('UserToken').get('/getListings', { params });
};

// Get listing by ID
export const getListingById = (propertyId) => {
  return axiosInstance('UserToken').get(`/getListingById/${propertyId}`);
};

// Get host by ID
export const getHostById = (hostId) => {
  return axiosInstance('UserToken').get(`/getHostById/${hostId}`);
};

// Property wishlist management

// Add property to wishlist
export const addToWishList = (propertyId, userId) => {
  return axiosInstance('UserToken').post('/addToWishList', { propertyId, userId });
};

// Get user's wishlist
export const getWishlist = (userId) => {
  return axiosInstance('UserToken').get(`/getWishlist/${userId}`);
};

// Remove property from wishlist
export const removeFromWishList = (propertyId, userId) => {
  return axiosInstance('UserToken').post('/removeFromWishList', { propertyId, userId });
};

// Property booking and review management

// Process payment checkout
export const postCheckout = (details) => {
  return axiosInstance('UserToken').post('/checkOut', details);
};

// Get booking by property ID
export const getBookingByPropertyId = async (propertyId) => {
  return axiosInstance('UserToken').get(`/getBookingByPropertyId/${propertyId}`);
};

// Add a review
export const addReview = async (reviewDetails) => {
  return axiosInstance('UserToken').post('/addReview', { reviewDetails });
};
