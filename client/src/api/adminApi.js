import axiosInstance from "../axios";

// Admin login
export async function postLogin(data) {
  console.log("heee");
  return axiosInstance('AdminToken').post('/admin/login', data);
}

// Add a host
export async function postAddHost(data) {
  return axiosInstance('AdminToken').post('/admin/addhost', data);
}

// Get users
export async function getUsers() {
  return axiosInstance('AdminToken').get('/admin/users');
}

// Get hosts
export async function getHosts() {
  return axiosInstance('AdminToken').get('/admin/hosts');
}

// Block a user
export async function postBlockUser(Id) {
  return axiosInstance('AdminToken').post('/admin/blockuser', { userId: Id });
}

// Unblock a user
export async function postUnBlockUser(Id) {
  return axiosInstance('AdminToken').post('/admin/unblockuser', { userId: Id });
}

// Block a host
export async function postBlockHost(Id) {
  return axiosInstance('AdminToken').post('/admin/blockhost', { hostId: Id });
}

// Unblock a host
export async function postUnBlockHost(Id) {
  return axiosInstance('AdminToken').post('/admin/unblockhost', { hostId: Id });
}

// Admin logout
export async function postAdminLogout() {
  return axiosInstance('AdminToken').post('/admin/logout');
}

// Update withdrawal status
export async function updateWithdrawStatus(data) {
  return axiosInstance('AdminToken').post('/admin/updatestatus', { data });
}

// Get properties
export async function getProperties() {
  return axiosInstance('AdminToken').get('/admin/properties');
}

// Update listing status by property ID
export async function updateListingStatus(propertyId, status) {
  return axiosInstance('AdminToken').post(`/admin/property-status-update/${propertyId}`, { status });
}

// Get bookings
export async function getBookings() {
  return axiosInstance('AdminToken').get('/admin/bookings');
}

// Get withdrawals
export async function getWithdraw() {
  return axiosInstance('AdminToken').get('/admin/getWithdraw');
}

// Get user by ID
export async function getUserById(Id) {
  return axiosInstance('AdminToken').get(`/admin/getUserById/${Id}`);
}

// Get booking by ID
export async function getBookingById(Id) {
  return axiosInstance('AdminToken').get(`/admin/getBookingById/${Id}`);
}
