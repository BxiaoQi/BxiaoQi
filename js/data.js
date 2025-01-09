// 作者：北小齐    http://bxiaoqi.netlify.app/

/**
 * 描述： 用户信息数据储存全部用户信息
 * 参数  username： 用户名
 * 参数  password： 密码
 * 参数  email： 邮箱
 * 参数  permiss： 权限 0：游客 1：普通用户 2：管理员 3：超级管理员
 * 参数  avatar： 头像
 */

// 用户数据
var userdata = [
    { username: "北小齐", password: "127769", email: "1465583644@qq.com", permiss: 3, avatar: "./images/userAvatar/TX_1.png" },
    { username: "BxiaoQi", password: "127769", email: "1465583644@qq.com", permiss: 1, avatar: "./images/userAvatar/TX_1.png" },
]

/**
 * 模拟数据库
 * 参数  name： 名称
 * 参数  desc： 描述
 * 参数  ico： 图标
 * 参数  src： 链接
 * 参数  permiss： 权限
 */
var data = {
    tools: {
        name: "在线工具",
        data: [
            { ico: "./images/appicon/icon.png", name: "BMI计算器", src: "./tool/BMI/index.html", desc: "计算体质指数检测你是否是真的胖（结果数据由世界卫生组织定制）", permiss: 0 },
            { ico: "./images/appicon/icon.png", name: "项目2", src: "#", desc: "描述2", permiss: 1 },
        ]
    },
    video: {
        name: "在线影视",
        data: [
            { ico: "./images/appicon/icon.png", name: "项目3", src: "#", desc: "描述3", permiss: 0 },
            { ico: "./images/appicon/icon.png", name: "项目4", src: "#", desc: "描述4", permiss: 1 },
        ]
    },
    music: {
        name: "在线音乐",
        data: [
            { ico: "./images/appicon/icon.png", name: "项目5", src: "#", desc: "描述5", permiss: 0 },
            { ico: "./images/appicon/icon.png", name: "项目6", src: "#", desc: "描述6", permiss: 1 },
        ]
    },
    progm: {
        name: "实用程序",
        data: [
            { ico: "./images/appicon/icon.png", name: "项目7", src: "#", desc: "描述7", permiss: 1 },
            { ico: "./images/appicon/icon.png", name: "项目8", src: "#", desc: "描述8", permiss: 1 },
        ]
    },
    hides: {
        name: "隐藏功能",
        data: [
            { ico: "./images/appicon/icon.png", name: "项目9", src: "#", desc: "描述9", permiss: 2 },
            { ico: "./images/appicon/icon.png", name: "项目10", src: "#", desc: "描述10", permiss: 1 },
        ]
    }
}