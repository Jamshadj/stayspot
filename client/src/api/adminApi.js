import axios from "../axios"

export async function postLogin(data) {
    return axios.post('/admin/login', data);
}
export async function getUsers() {
    return  await axios.get('/admin/users');
}
export async function getHosts() {
    return  await axios.get('/admin/hosts');
}
export async function postBlockUser(Id) {
    return  await axios.post('/admin/blockuser',{ userId: Id });
}
export async function postUnBlockUser(Id) {
    return  await axios.post('/admin/unblockuser',{ userId: Id });
}
export async function postBlockHost(Id) {
    return  await axios.post('/admin/blockhost',{ hostId: Id });
}
export async function postUnBlockHost(Id) {
    return  await axios.post('/admin/unblockhost',{ hostId: Id });
}
export async function postAdminLogout(){
return await axios.post('/admin/logout')
}