import { baseUrl } from "../js/constant/url.js";
import { REGEXP_USERNAME, REGEXP_PASSWORD } from "../js/constant/regexp.js";
import { UtilClass } from "../../js/Utils/Utils.js";

let Utils = new UtilClass()
// 页面加载完成
window.onload = () => {
    document.getElementById("login_btn").addEventListener("click", login);
    document.getElementById("register_btn").addEventListener("click", register);
    // 添加键盘监听，监听回车登录
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            login();
        }
    });
}

async function login() {
    var load = document.getElementById("load-box");
    load.style.display = "flex"; // 显示加载框
    var username = document.getElementById("login_name").value;
    var password = document.getElementById("login_password").value;
    if (username == "" || password == "") {
        load.style.display = "none";
        Utils.popup("信息填写不完整", 2);
        return;
    }

    let params = { username: username, password: password };
    let res = await axios.post(baseUrl + "/user/login", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    if (res.data.code == 200) {
        let token = res.data.data;
        // 存储token
        localStorage.setItem("token", token);
        load.style.display = "none"; // 隐藏加载框
        Utils.popup("登录成功", 1);
        // 跳转
        let resp = await axios.post(baseUrl + "/user/getUserByToken", {}, {
            headers: { "Authorization": token }
        })
        if (resp.data.data.permission >= 3) {
            window.location.href = "../../view/Backstage/dataManage.html";
        } else {
            window.location.href = "../../index.html";
        }

    } else {
        load.style.display = "none";
        console.log(res.data);
        Utils.popup(res.data.message, 2);
        return;
    }

}

async function register() {
    var username = document.getElementById("register_name").value;
    var password = document.getElementById("register_password").value;
    var password2 = document.getElementById("register_password_two").value;
    if (username == "" || password == "" || password2 == "") {
        Utils.popup("信息填写不完整", 2);
        return;
    }
    if (password != password2) {
        Utils.popup("两次输入的密码不一致", 2);
        return;
    }
    if (!username.match(REGEXP_USERNAME)) {
        alert("用户名格式不正确。\n1.只能包含中文、英文、数字、下划线、以及长度为3-16位");
        return;
    }
    if (!password.match(REGEXP_PASSWORD)) {
        alert("密码格式不正确。\n1.只能包含英文、数字、下划线、以及长度为6-16位");
        return;
    }
    let params = { username: username, password: password };
    var res = await axios.post(baseUrl + "/user/register", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    if (res.data.code == 200) {
        Utils.popup("注册成功", 1);
        setTimeout(() => {
            window.location.href = "./login.html";
        }, 2000);
    } else {
        Utils.popup(res.data.message, 2);
        return;
    }
}