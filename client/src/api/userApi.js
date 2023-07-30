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

export const postLogout = () => {
  return axios.post('/logout');
};

export const getListings=()=>{
  return axios.get('/getListings')
}

