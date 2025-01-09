
var userObj = { username: "游客", password: "123456", email: "无", permiss: 0, avatar: "./images/userAvatar/tourist.png" }
// 自执行函数
!function () {
    let user = document.getElementById("username"); // 获取用户名元素
    let userstr = localStorage.getItem("user"); // 获取用户信息
    let avatar = document.getElementById("avatar"); // 获取用户头像元素
    if (JSON.parse(userstr)) {
        userObj = JSON.parse(userstr); // 将字符串转为对象
    }
    user.innerText = "欢迎您！" + userObj.username; // 显示用户名
    avatar.src = userObj.avatar;
    show("all")
    switchlogin()
}();

// 显示菜单
function expand() {
    let checkbox = document.getElementById("menuSwitch");
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        document.getElementById("content").style.left = "200px";
    } else {
        document.getElementById("content").style.left = "70px";
    }
}

// 是否显示隐藏功能
function hides() {
    if (userObj.permiss == 0) {
        var result = confirm("隐藏功能需要登录，是否跳转登录?");
        if (result) {
            window.location.href = "./view/login.html";
        }
    } else {
        show("hides")
    }
}

// 切换登录图标
function switchlogin() {
    let loginIconObj = document.getElementById("loginIcon");
    let loginTextObj = document.getElementById("loginText");
    if (userObj.permiss == 0) {
        loginIconObj.src = "./images/icon/login.png";
        loginTextObj.innerText = "登录账号";
    } else {
        loginIconObj.src = "./images/icon/logout.png";
        loginTextObj.innerText = "退出登录";
    }
}

// 退出登录
function login() {
    if (userObj.permiss == 0) {
        window.location.href = "./view/login.html";
    } else {
        var result = confirm("确定退出登录吗？");
        if (result) {
            localStorage.removeItem("user");
            window.location.href = "./index.html";
        }
    }
}


// 显示数据
function show(group) {
    let tbody = document.getElementById("tbody")
    let title = document.getElementById("titlename");
    tbody.innerHTML = "";
    let htmlstr = "";
    if (group == "all") {
        let allkeys = Object.keys(data);
        for (let i = 0; i < allkeys.length; i++) {
            let key = allkeys[i];
            let value = data[key].data;
            for (let j = 0; j < value.length; j++) {
                htmlstr += jointItem(value[j]);
            }
        }
        title.innerText = "北小齐珍藏";
    } else {
        let value = data[group].data;
        for (let i = 0; i < value.length; i++) {
            htmlstr += jointItem(value[i])
        }
        title.innerText = data[group].name;
    }
    tbody.innerHTML = htmlstr;
}

// 拼接单项数据
function jointItem(obj) {
    let str = ""
    if (userObj.permiss >= obj.permiss) {
        str = `
            <tr>
                <td><img src="${obj.ico}" alt="ico"></td>
                <td>${obj.name}</td>
                <td>${obj.desc}</td>
                <td>
                    <a href="">收藏</a>
                    <a href="${obj.src}" target="_blank">看看去</a>
                </td>
            </tr>
            `;
    }

    return str;
}
