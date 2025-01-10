
var userObj = { username: "游客", password: "123456", email: "无", permiss: 0, avatar: "./images/userAvatar/tourist.png" }
// 初始化函数
!function () {
    let user = document.getElementById("username"); // 获取用户名元素
    let userstr = localStorage.getItem("user"); // 获取用户信息
    let avatar = document.getElementById("avatar"); // 获取用户头像元素
    if (JSON.parse(userstr)) {
        userObj = JSON.parse(userstr); // 将字符串转为对象
    }
    user.innerText = "欢迎您！" + userObj.username; // 显示用户名称
    avatar.src = userObj.avatar; // 显示用户头像

    initMenu() // 初始化菜单
    switchlogin() // 初始化登录图标
    showData("all") // 初始化数据
}();


// 显示数据
function showData(key) {
    let tbody = document.getElementById("tbody"); // 获取表格对象
    let title = document.getElementById("titlename"); // 获取标题对象
    tbody.innerHTML = ""; // 清空数据
    let htmlstr = ""; // 拼接字符串变量初始化


    // 显示所有数据
    if (key == "all") {
        title.innerText = "北小齐珍藏"; // 设置标题
        Object.keys(dataList).forEach(key => htmlstr += jointItemGroup(dataList[key].data));

        // 显示指定数据
    } else {
        title.innerText = dataList[key].name; // 设置标题
        htmlstr += jointItemGroup(dataList[g].data); // 拼接数据
    }
    tbody.innerHTML = htmlstr; // 显示数据

    // 添加动画效果
    let newRows = tbody.querySelectorAll("tr");
    newRows.forEach((row, index) => {
        // row.classList.add("slide-in-right");
        setTimeout(() => {
            row.classList.add("slide-in-right");
        }, index * 100); // 延迟添加类以实现逐行动画效果
    });
}

// 一次性拼接一组数据
function jointItemGroup(list) {
    let str = ""
    for (let i = 0; i < list.length; i++) {
        str += jointItem(list[i]);
    }
    return str;
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


// 初始化菜单
function initMenu() {
    let menu = document.getElementById("menu");
    Object.keys(dataList).forEach(key => {
        menu.innerHTML += `
            <li title="${dataList[key].name}" onclick="showData('${key}')">
                <img src="${dataList[key].icon}" alt=""></img>
                <a href="javascript:showData('${key}')"> ${dataList[key].name} </a>
            </li>
        `;
    });
    menu.innerHTML += `
            <li onclick="login()">
                <img src="" alt="" id="loginIcon"></img>
                <a href="javascript:login()" id="loginText"></a>
            </li>
    `;
}


// 菜单展开/折叠开关
function expand() {
    let checkbox = document.getElementById("menuSwitch");
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        document.getElementById("content").style.left = "200px";
    } else {
        document.getElementById("content").style.left = "70px";
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
            window.location.href = "https://bxiaoqi.netlify.app/";
        }
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