import axios from "../axios";

export async function postSignUp(data) {
      return axios.post('/host/signup', data);
}
export async function postHostOtp(otp, formData) {
    return axios.post('/host/otp', { otp, ...formData });
  }
  export async function postLogin(data) {
    return axios.post('/host/login',  data);
  }
  export const loginWithGoogle = (data) => {
    return axios.post('/host/auth/login/google', data);
  };
  export const postHostLogout = () => {
    return axios.post('/host/logout');
  };
  export const postAddProperty = (data) => {
    console.log("dde");
    return axios.post('/host/add-property',{...data});
  };
  