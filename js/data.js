// 作者：北小齐    http://bxiaoqi.netlify.app/

/**
 * 描述： 用户信息数据储存全部用户信息
 * 参数  username： 用户名
 * 参数  password： 密码
 * 参数  email： 邮箱
 * 参数  permiss： 权限 0：游客 1：普通用户 2：管理员 3：超级管理员 4：开发者
 * 参数  avatar： 头像
 */

// 用户数据
var userdata = [
    { userid: 1001, username: "BxiaoQi", password: "177077", email: "1465583644@qq.com", permiss: 4, avatar: "./images/userAvatar/TX_1.png", regTime: "2025年1月10日" },
    { userid: 1002, username: "北小齐", password: "127769", email: "1465583644@qq.com", permiss: 1, avatar: "./images/userAvatar/TX_1.png", regTime: "2025年1月10日" },
]

/**
 * 模拟数据库
 * 参数  name： 名称
 * 参数  desc： 描述
 * 参数  ico： 图标
 * 参数  src： 链接
 * 参数  permiss： 权限
 */
var dataList = {
    tools: {
        name: "在线工具",
        icon: "./images/icon/在线工具.png",
        data: [
            { ico: "./images/appicon/icon.png", name: "BMI计算器", src: "./tool/BMI/index.html", permiss: 0, desc: "计算体质指数检测你是否是真的胖（结果数据由世界卫生组织定制）" },
            { ico: "./images/appicon/在线PSico.ico", name: "在线PS", src: "https://ps.gaoding.com/#/", permiss: 0, desc: "免下载的PS，即不占电脑内存又可以快速打开，PS常用的功能这里都有" },
            // { ico: "./images/appicon/icon.png", name: "模板", src: "#", desc: "描述3", permiss: 4 },
        ]
    },
    video: {
        name: "在线影视",
        icon: "./images/icon/视频.png",
        data: [
            // { ico: "./images/appicon/icon.png", name: "模板", src: "#", desc: "描述3", permiss: 4 },

        ]
    },
    music: {
        name: "在线音乐",
        icon: "./images/icon/音乐.png",
        data: [
            // { ico: "./images/appicon/icon.png", name: "模板", src: "#", desc: "描述3", permiss: 4 },

        ]
    },
    progm: {
        name: "实用程序",
        icon: "./images/icon/主程序.png",
        data: [
            // { ico: "./images/appicon/icon.png", name: "模板", src: "#", desc: "描述3", permiss: 4 },

        ]
    },
    hides: {
        name: "隐藏功能",
        icon: "./images/icon/锁.png",
        data: [
            { ico: "./images/appicon/icon.png", name: "界面简单1", src: "https://spankbang.com/", desc: "力推", permiss: 4 },
            { ico: "./images/appicon/icon.png", name: "界面简单2", src: "https://www.xvideos.com/", desc: "推荐", permiss: 4 },
            { ico: "./images/appicon/icon.png", name: "界面简单3", src: "https://beeg.com/", desc: "可以", permiss: 4 },
            { ico: "./images/appicon/icon.png", name: "动漫风格", src: "https://18comic.vip/", desc: "动漫风格", permiss: 4 },
            { ico: "./images/appicon/icon.png", name: "直播", src: "https://zh.stripchat.com/", desc: "有直播", permiss: 4 },
            // { ico: "./images/appicon/icon.png", name: "模板", src: "#", desc: "描述3", permiss: 4 },

        ]
    }
}
