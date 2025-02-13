import { baseUrl } from "../constant/url.js";

let token = "";
let userinfo = {};

window.onload = async function () {
    token = localStorage.getItem("token", token);
    await getUserInfo(token);
    document.getElementById("username").innerHTML = userinfo.username;
}

export async function getUserInfo(token) {
    let res = await axios.post(baseUrl + '/user/getUserByToken', {}, {
        headers: { 'Authorization': token }
    })
    userinfo = res.data.data
    return userinfo;
}