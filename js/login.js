var retriesnum = 0; // 登录失败次数

// 初始化函数
!function () {
    isDisable() // 判断是否被禁用登录
}();


// 登录
function login() {
    let username = document.getElementById("login-user").value;
    let password = document.getElementById("login-password").value;
    if (username !== "" && password !== "") {
        for (let i = 0; i < userdata.length; i++) {
            if (userdata[i].username == username && userdata[i].password == password) {
                let userObj = userdata[i]; // 获取用户信息
                localStorage.setItem("user", JSON.stringify(userObj)); // 存储用户信息
                showCustomAlert("登录成功", `
                    <button onclick="window.location.href = '../index.html'">确定</button>
                `);
                return;
            }
        }

        // 登录失败次数大于等于3次
        if (retriesnum >= 3) {
            localStorage.setItem("forbidTime", new Date().getTime()); // 存储禁用登录时间
            DisableLogin() // 禁用登录
            // 建议找回密码
            showCustomAlert("登录失败次数过多<br/>建议您关注公众号发送“找回密码”<br/>查看详细流程", `
                    <img src="../images/QR_code.png" alt="">
                    <button onclick='hideCustomAlert()'>确定</button>
                `);
            return;
        } else if (retriesnum < 3) {
            // 账号或密码错误
            showCustomAlert("账号或密码错误", `
                        <button onclick="retpwd()">找回密码</button>
                        <button onclick='hideCustomAlert()'>重试</button>
                    `);
            retriesnum++; // 登录失败次数加1
            return;
        }
    }
    showCustomAlert("信息填写不完整", `
        <button onclick='hideCustomAlert()'>重新填写</button>
    `);
    return;
}

function retpwd() {// 建议找回密码
    showCustomAlert("关注公众号发送“找回密码”<br/>查看详细流程", `
            <img src="../images/QR_code.png" alt="">
            <button onclick='hideCustomAlert()'>确定</button>
        `);
}

// 显示自定义弹窗
function showCustomAlert(message, buttons) {
    document.getElementById("alert-message").innerHTML = message;
    document.getElementById("alert-buttons").innerHTML = buttons;
    document.getElementById("custom-alert").style.display = "block";
}

// 隐藏自定义弹窗
function hideCustomAlert() {
    document.getElementById("custom-alert").style.display = "none";
}

// 判断是否被禁用登录
function isDisable() {
    if (getforbidTime()) {
        let time = new Date().getTime() - getforbidTime(); // 获取当前时间与禁用登录时间之差
        let Liberate = new Date(getforbidTime() + 86400000); // 获取解禁时间

        // 如果被禁用登录
        if (time < 86400000) {
            DisableLogin() // 禁用登录
            // 提示：您已被限制登录
            showCustomAlert("您已被限制登录<br/>请在" + dateformat(Liberate, "MM月dd日 hh:mm:ss") + "后再试<br/>可以关注公众号获取帮助", `
                <img src="../images/QR_code.png" alt="">
                <button onclick='hideCustomAlert()'>关闭</button>`);
            return;
        } else {
            localStorage.removeItem("forbidTime");
            return;
        }
    }
    return;
}

// 禁用登录操作
function DisableLogin() {
    let loginbtn = document.getElementById("login-btn")
    let loginuser = document.getElementById("login-user")
    let loginpassword = document.getElementById("login-password")
    loginbtn.style.display = "none"; // 隐藏登录按钮
    loginuser.disabled = true; // 禁用登录
    loginpassword.disabled = true; // 禁用登录
    loginuser.value = ""; // 清空登录信息
    loginpassword.value = ""; // 清空登录信息
}

// 获取禁止登录时间
function getforbidTime() {
    let forbidTime = parseInt(localStorage.getItem("forbidTime"));
    if (forbidTime) {
        return forbidTime;
    } else {
        return 0;
    }
}

// 封装选择器, 采用ES6箭头函数写法
const getSelector = ele => {
    return typeof ele === "string" ? document.querySelector(ele) : "";
}

const containerShow = () => {
    var show = getSelector(".container")
    show.className += " container-show"
}

window.onload = containerShow;
((window, document) => {
    let toSignBtn = getSelector(".toSign"),
        toLoginBtn = getSelector(".toLogin")
    loginBox = getSelector(".login-box"),
        signBox = getSelector(".sign-box");

    toSignBtn.onclick = () => {
        loginBox.className += ' animate_login';
        signBox.className += ' animate_sign';
    }

    toLoginBtn.onclick = () => {
        loginBox.classList.remove("animate_login");
        signBox.classList.remove("animate_sign");
    }


})(window, document);