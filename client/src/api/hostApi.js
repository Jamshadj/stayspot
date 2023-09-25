import axiosInstance from "../axios";

// User registration
export async function postSignUp(data) {
  return axiosInstance('HostToken').post('/host/signup', data);
}

// Verify host OTP
export async function postHostOtp(otp, formData) {
  return axiosInstance('HostToken').post('/host/otp', { otp, ...formData });
}

// User login
export async function postLogin(data) {
  return axiosInstance('HostToken').post('/host/login', data);
}

// Login with Google
export const loginWithGoogle = (data) => {
  return axiosInstance('HostToken').post('/host/auth/login/google', data);
}

// Host logout
export const postHostLogout = () => {
  return axiosInstance('HostToken').post('/host/logout');
}

// Add a property
export const postAddProperty = (data) => {
  return axiosInstance('HostToken').post('/host/add-property', { ...data });
}

// Set dates for a property
export const setDates = (data) => {
  return axiosInstance('HostToken').post('/host/set-date', data);
}

// Update host details
export async function updateDetails(hostId, details) {
  return axiosInstance('HostToken').post(`/host/updateDetails/${hostId}`, { details });
}

// Get bookings by host ID
export async function getBookingByHostId(Id) {
  return axiosInstance('HostToken').get(`/host/getBookingById/${Id}`);
}

// Get withdrawal by host ID
export async function getWithdrawById(hostId) {
  return axiosInstance('HostToken').get(`/host/withdraw/${hostId}`);
}

// Update booking status
export async function updateBookingStatus(bookingId, status, hostId) {
  return axiosInstance('HostToken').post(`/host/updatestatus/${bookingId}`, { status, hostId });
}

// Request a withdrawal
export async function withdrawRequest(withdrawalRequest) {
  return axiosInstance('HostToken').post('/host/withdraw', { withdrawalRequest });
}
