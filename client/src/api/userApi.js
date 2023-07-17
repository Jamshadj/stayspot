import axios from "../axios";

export async function postSignUp(data) {
      return axios.post('/signup', data);
}
export async function postUserOtp(otp, formData) {
      return axios.post('/otp', { otp, ...formData });
    }
export async function postLogin(data) {
      return axios.post('/login',  data);
    }

    export const loginWithGoogle = (data) => {
      return axios.post('/auth/login/google', data);
    };
    export const postLogout = () => {
      return axios.post('/logout');
    };