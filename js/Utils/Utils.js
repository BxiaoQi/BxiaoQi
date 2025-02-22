/// 目录
/// 选中标题按 Ctrl + D 跳转对应函数
//. 获取浏览器地址栏url?后面的参数
//. 获取url锚点
//. rgb色值转16进制色值
//. 16进制色值转rgb色值
//. 数组去重
//. 生成随机数
//. 生成一个随机颜色值
//. 数组排序
//. 键盘监听事件
//. 消息提示
//. 序列化表单数据(原作者:周老师)
//. 回显表单数据
//. ajax请求
//. 日期格式化
//. 
//. 
//. 


//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用:获取浏览器地址栏url?后面的参数
export function getParam() {
    let url = window.location.search;
    let params = url.substring(1).split("&");
    let Object = {};
    // 遍历params数组并将其拆分成key和value然后存入result对象中，同时将key和value从url编码还原
    for (let i = 0; i < params.length; i++) {
        let keyValue = params[i].split("=");
        // 将key和value从url编码还原后存入result对象中
        Object[keyValue[0]] = decodeURIComponent(keyValue[1]);
    }
    return Object;
}
// 调用语法:   getParam()
// 返回值   对象,如:
// 假设url = https://www.baidu.com/s?ie=utf-8&wd=百度
//          对象:{"ie": "utf-8","wd": "百度"}

// 使用方法:
//      console.log(getParam().wd); // 输出百度

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
// 函数作用:获取url锚点
export function geturlAnchor() {
    return window.location.hash.substring(1);
}
// 调用语法:    geturlAnchor()
// 返回值:      无返回值
//
// 应用场景&使用方法:
//      应用场景: 使用锚链接跳转页面传值(只可传一个值，通常传id使用)
//      使用方法:
//          http://localhost:80/index.html#id
//          geturlAnchor()  id

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
// 函数作用:rgb色值转16进制色值
export function rgbToHex(r, g, b) {
    let arr = [];
    if (typeof r == "string") {
        arr = r.split("(")[1].split(")")[0].split(",");
        r = arr[0], g = arr[1], b = arr[2];
    }
    let hex = ((r << 16) | (g << 8) | b).toString(16);
    while (hex.length < 6) {
        hex = "0" + hex;
    }
    return "#" + hex;
}
// 调用语法:   rgbToHex(Number: r, Number: g, Number: b) || rgbToHex(String: "rgb(r, g, b)")
// 返回值   字符串,如:
//          字符串: #00ff00

// 使用方法一:
//      console.log(rgbToHex(0,0,0));    // 输出  #000000
// 使用方法二:
//      console.log(rgbToHex("rgb(21,188,20)"));    // 输出  #15bc14

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用:16进制色值转rgb色值
export function hexToRgb(hex, isArr) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    if (isArr) {
        return [r, g, b]
    } else {
        return ("rgb(" + r + ", " + g + ", " + b + ")");
    }
}
// 调用语法:   hexToRgb(String: hex, Boolean: isArr)
// 返回值   字符串 || 数组,如:
//          字符串: rgb(38, 154, 255)
//          数组: [38, 154, 255]

// 使用方法一:
//      console.log(hexToRgb("#aa12f1", false));    // 输出  rgb(170, 18, 241)
// 使用方法二:
//      console.log(hexToRgb("#aa12f1", true));    // 输出  [ 170, 18, 241 ]

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用:数组去重
export function DelArrRep(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
// 调用语法:    DelArrRep(Array: arr)
// 返回值:  数组,如:
//      数组: [ '张三', '李四', 1, 5, 9, 2 ]

// 使用方法:
//      console.log(DelArrRep(["张三","李四","张三",1,5,9,5,2,1,9]));    // 输出  [ '张三', '李四', 1, 5, 9, 2 ]

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用:生成随机数
export function RandomNum(min, max, length) {
    if (max < min) {
        let temp = max;
        max = min;
        min = temp;
    }
    if (length == 1 || length == undefined) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr.push((Math.floor(Math.random() * (max - min + 1)) + min));
        }
        return arr;
    }
}
// 调用语法:    RandomNum(Number: min, Number: max, Number: length)
// 返回值:  整数 || 数组
//          整数: 58

// 使用方法一:
//      console.log(RandomNum(1, 100));    // 输出  58
// 使用方法二:
//      console.log(RandomNum(1, 100, 10));    // 输出  [50, 14, 64,  23, 70, 16, 20, 43, 100, 95]

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用: 生成一个随机颜色值
export function RandomColor(isRgb) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    if (isRgb) {
        return "rgb(" + r + "," + g + "," + b + ")";
    } else {
        let hex = ((r << 16) | (g << 8) | b).toString(16);
        while (hex.length < 6) {
            hex = "0" + hex;
        }
        return "#" + hex;
    }
}
// 调用语法:    RandomColor(Boolean: isRgb);
// 返回值:  字符串,如何:
//      字符串: rgb(12, 255, 196)
//      字符串: #9cdcfe
// 使用方法:
//      console.log(RandomColor(true));    // 输出  rgb(40,123,184)
//      console.log(RandomColor(false));    // 输出  #d86035

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

// 函数作用:数组排序
export function ArrSort(arr, isMax_Min) {
    if (isMax_Min) {
        return arr.sort(function fun(a, b) { return b - a; });
    } else {
        return arr.sort(function fun(a, b) { return a - b; });
    }
}
// 调用语法:    ArrSort(Array: arr, Boolean: isMax_Min)
// 返回值:   数组,如:
//      数组:[1,2,3,4,5,6,7]
// 使用方法:
//      console.log(ArrSort([5, 9, 3, 7, 5, 6, 1, 8], false));    // 输出  [ 1, 3, 5, 5, 6, 7, 8, 9 ]
//      console.log(ArrSort([5, 9, 3, 7, 5, 6, 1, 8], true));    // 输出  [ 9, 8, 7, 6, 5, 5, 3, 1 ]

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
// 函数作用:键盘监听事件
export function keyMonitor(e, dsq) {
    let body = document.getElementsByTagName("body")[0];
    let PromptBox = document.getElementById("PromptBox");
    clearTimeout(dsq);
    if (PromptBox != undefined || PromptBox != null) {
        PromptBox.style = "display: inline-block;position: fixed;background-color: #55ff55;bottom: 50%;left: 50%;border-radius: 10px;padding: 10px;transform: translate(-50%);"
        PromptBox.innerText = "您点击了>" + (e.key.charAt(0).toUpperCase() + e.key.slice(1)) + "<\n它的值为>" + e.keyCode + "<";
    } else {
        body.innerHTML = "<div id=\"PromptBox\"></div>" + body.innerHTML;
        PromptBox.style = "display: inline-block;position: fixed;background-color: #55ff55;bottom: 50%;left: 50%;border-radius: 10px;padding: 10px;transform: translate(-50%);"
        PromptBox.innerText = "您点击了>" + (e.key.charAt(0).toUpperCase() + e.key.slice(1)) + "<\n它的值为>" + e.keyCode + "<";
    }
    if (PromptBox.style.display != "none") {
        dsq = setTimeout(function () {
            PromptBox.style.display = "none";
        }, 3000);
        return dsq;
    }
}
// 调用语法:
//      let globalVar;
//      onkeydown = function (e) {globalVar = keyMonitor(Object: e,globalVar);}
// 返回值:  定时器名
//
// 使用方法:
//      直接运用下边两行即可使用
//      let globalVar;
//      onkeydown = function (e) {globalVar = keyMonitor(e,globalVar);}

//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
// 函数作用: 消息提示
export function popup(inf, num, timeoutId) {
    let popup = document.getElementById('popup');
    let colors = [
        "#147EC9", // 蓝色(消息)
        "#11AD45", // 绿色(成功)
        "#E60914" // 红色(失败)
    ];
    if (popup == undefined) {// 创建一个新的 div 元素
        var popupDiv = document.createElement('div');
        // 设置 id 属性
        popupDiv.id = 'popup';
        // 将新创建的 div 添加到 body 中
        document.body.appendChild(popupDiv);
        // 添加样式
        popup = document.getElementById('popup');
        popup.style = "padding: 20px;position: fixed;bottom: 5%;left: 50%;transform: translate(-50%, -50%);border-radius: 15px;z-index: 9999;";
    }
    // 清除任何现有超时以防止隐藏先前的单击
    clearTimeout(timeoutId);
    popup.style.backgroundColor = colors[num];
    popup.innerText = inf;
    popup.style.display = 'block';

    // 设置新的超时以隐藏3秒后的弹出窗口
    timeoutId = setTimeout(function () {
        popup.style.display = 'none';
    }, 3000);
    return timeoutId;
}
// 调用语法:    popup(String: inf, Number: num);
// 返回值:      无返回值;
//
// 使用方法:
//.     let timeoutId; // 放到全局
//      timeoutId = popup(inf, num, timeoutId);

//      参数 inf 代表提示信息, num 可选 1:成功; 0:消息; -1:警告, timeoutId 固定不变

//.  ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
// 函数作用:序列化表单数据(原作者:周老师)
export function serialize(form, isjson) {
    let params = [];
    if (isjson) {
        params = {};
    }
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        //// 处理特殊类型
        switch (field.type) {
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
                if (isjson && field.checked) {
                    params[field.name] = field.value;
                    break;
                }
            case "checkbox":
                /// 判断是否返回json
                if (isjson) {
                    /// 判断复选框是否选中
                    if (field.checked) {
                        /// 判断params对象里面是否存在field.name属性名这里注意[]用法
                        if (params[field.name]) {
                            params[field.name].push(field.value);/// 存在：想数组里添加内容
                        } else {
                            params[field.name] = [field.value];/// 不存在：创建数组
                        }
                    }
                    break;
                } else {
                    if (!field.checked) {
                        break;
                    }
                }
            default:
                if (isjson) {
                    params[field.name] = field.value;
                } else {
                    //不包含没有名字的表单字段
                    if (field.name.length) {
                        params.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`);
                    }
                }
        }
    }
    if (isjson) {
        return params;
    } else {
        return params.join("&");
    }
}
// 调用语法:    serialize(Object: form, Boolean: isjson);
// 返回值:  对象 || 字符串
//          对象: {name:admin,password:123}
//          字符串: name=admin&password=123
//
// 使用方法:
//      假如表单里面输入用户名：张三，密码：123
//.     表单每个字段必须有name属性值
//      let formObj = document.querySelector("form");
//      serialize(formObj,false)  "name=张三&password=123"
//      serialize(formObj,true)  {user:"张三",password:"123"}
//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
/**
 * 回显表单数据
 * @param {Object} form 表单对象
 * @param {Object} obj  对象
 * @returns {Object} form 表单对象
 * 
 */
export function showForm(form, obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if (field.name == keys[keys.indexOf(field.name)]) {
            if (field.type == "radio") {
                field.checked = field.value == obj[field.name];
            } else if (field.type == "checkbox") {
                field.checked = obj[field.name].includes(field.value);
            } else if (field.type == "file") {
                continue;
            } else {
                field.value = obj[field.name];
            }
        }
    }
}
//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
/**
 * ajax请求封装
 * @param {Object} obj 请求对象
 * @returns {Object} 返回xhr对象
 */
export function ajax(obj) {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.type, obj.url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (obj.success) {
                    obj.success(xhr.responseText);
                }
            } else {
                if (obj.error) {
                    obj.error(xhr.status);
                }
            }
        }
    }
    if (obj.type === 'POST' || obj.type === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/' + obj.dataType + ';charset=utf-8');
        console.log(obj.data);

        xhr.send(obj.data);
    } else if (obj.type === 'GET' || obj.type === 'get') {
        xhr.send();
    }
}
//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
/**
 * 日期格式化
 * @description
 * @param {Date} date 日期对象
 * @param {String} fmt 格式化字符串
 * @returns {String} 格式化后的日期字符串
 */
export function dateformat(date = new Date(), fmt = "yyyy-MM-dd hh:mm:ss.SSS") {
    let o = {
        "yyyy": repair(date.getFullYear()),
        "MM": repair(date.getMonth() + 1),
        "dd": repair(date.getDate()),
        "hh": repair(date.getHours()),
        "mm": repair(date.getMinutes()),
        "ss": repair(date.getSeconds()),
        "SSS": date.getMilliseconds(),
        "e": date.getDay()
    }
    fmt = fmt.replace(/yyyy|MM|dd|hh|mm|ss|SSS|e/g, function (v) {
        return o[v];
    });

    return fmt;
}
//. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
/**
 * 日期补0操作
 */
export function repair(num){
    return (num < 10 ? ("0" + num) : num).toString();
}

