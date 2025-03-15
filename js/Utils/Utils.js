/// 目录
/// 选中标题按 Ctrl + D 跳转对应函数
//. 获取地址栏参数
//. 获取地址栏锚点
//. rgb转16进制
//. 16进制转rgb
//. 色值格式互转
//. 数组去重
//. 生成随机数
//. 生成随机色
//. 数组排序
//. 键盘监听事件
//. 消息提示
//. 序列化表单
//. Ajax请求
//. 回显表单数据
//. 日期格式化
//. 计算过去时间
//. 读取剪贴板
//. 

export class UtilClass {
    /// ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    // 消息提示相关参数
    timeoutId = 0; // 定时器id
    colors = [
        "#147EC9", // 蓝色(消息)
        "#11AD45", // 绿色(成功)
        "#E60914" // 红色(失败)
    ];
    // 键盘监听相关参数
    keyTimeoutId = 0;
    /// ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 




    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 获取地址栏参数
     * @description 获取浏览器地址栏url?后面的参数，并以对象形式返回，适合跨页面多个值传送
     * @returns {Object} 参数对象
     */
    getParam() {
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

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 获取地址栏锚点
     * @description 获取地址栏url#后面的锚点，适合跨页面传送单个值
     * @returns {string} 锚点值
     */
    geturlAnchor() {
        return window.location.hash.substring(1);
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name rgb转16进制
     * @description 将rgb色值转16进制色值，如果传入16进制色值，则直接返回传入的值
     * @param {string or Number } r rgb色值:"rgb(11,11,11)" 或 r值
     * @param {Number} g rgb色值 g值
     * @param {Number} b rgb色值 b值
     * @returns {string} rgb色值 16进制hex
     */
    rgbToHex(r, g, b) {
        if (r.indexOf("#") !== -1) {
            return r;
        }
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

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 16进制转rgb
     * @description 将16进制色值转rgb色值，如果传入rgb色值，则直接返回传入的值
     * @param {string} hex 16进制色值
     * @param {boolean} isArr 是否返回rgb色值数组
     * @returns {string || Array<Number>} rgb色值 16进制hex 或 rgb色值数组
     */
    hexToRgb(hex, isArr) {
        // 判断hex开头是否是rgb
        if (hex.indexOf("rgb") != -1) {
            return hex;
        }
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        if (isArr) {
            return [r, g, b]
        } else {
            return ("rgb(" + r + ", " + g + ", " + b + ")");
        }
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 色值格式互转
     * @description 如果转来的值是hex格式返回rgb格式，如果转来的值是rgb格式返回hex格式
     * @param {String} colorParam 色值
     * @returns {string} 转换后的色值
     */
    colorFormat(colorParam) {
        let result = "";
        if (colorParam.indexOf("#") != -1) {
            let i = colorParam.indexOf("#")
            colorParam = colorParam.slice(i, colorParam.length);
            let s = 0;
            colorParam.length < 8 ? s = 0 : s = 2;
            let r = parseInt(colorParam.slice(s + 1, s + 3), 16);
            let g = parseInt(colorParam.slice(s + 3, s + 5), 16);
            let b = parseInt(colorParam.slice(s + 5, s + 7), 16);
            if (colorParam.length <= 8) {
                // 不带有透明度
                result = ("rgb(" + r + ", " + g + ", " + b + ")");
            } else {
                // 带有透明度
                let a = (parseInt(colorParam.slice(1, 3), 16) / 255).toFixed(2);
                result = ("rgba(" + r + ", " + g + ", " + b + ", " + a + ")");
            }
        } else {
            let arr = colorParam.split("(")[1].split(")")[0].split(",");
            let r = arr[0];
            let g = arr[1];
            let b = arr[2];
            if (colorParam.indexOf("rgba") != -1) {
                // 带有透明度
                let a = arr[3];
                result = ("#" + Math.round(parseInt(a) * 255).toString(16) + parseInt(r).toString(16) + parseInt(g).toString(16) + parseInt(b).toString(16));
            } else {
                // 不带有透明度
                result = ("#" + parseInt(r).toString(16) + parseInt(g).toString(16) + parseInt(b).toString(16));
            }
        }
        return result;
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 数组去重
     * @description 将传递过来的数组重复项删除
     * @param { Array<Number> } arr 数组
     * @returns { Array<Number> } 去重后的数组
     */
    DelArrRep(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) == -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 生成随机数
     * @description 生成指定数量的随机数，当length为1时，生成一个随机数且返回值类型为 Number，否则生成指定数量的随机数返回值类型为 Array<Number>
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @param {Number} length 生成数量
     * @returns {Number || Array<Number>} 生成的随机数数组
     */
    RandomNum(min, max, length) {
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

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 生成随机色
     * @description 随机生成一个颜色值，可以选择返回rgb色值或16进制色值
     * @param {boolean} isRgb 是否返回rgb色值
     * @returns {string} 随机颜色值
     */
    RandomColor(isRgb) {
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

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 数组排序
     * @description 将传递过来的数组进行排序，可以选择升序或降序
     * @param {Array<Number>} arr 数组
     * @param {boolean} isMax_Min 是否降序
     * @returns 
     */
    ArrSort(arr, isMax_Min) {
        if (isMax_Min) {
            return arr.sort(function fun(a, b) { return b - a; });
        } else {
            return arr.sort(function fun(a, b) { return a - b; });
        }
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 键盘监听事件
     * @description 始终监听用户按下的键并以消息的样式反馈给用按下的 键名 和 键值
     * @param {Object} e 键盘事件对象
     */
    keyMonitor(e) {
        let PromptBox = document.getElementById('PromptBox');
        clearTimeout(this.keyTimeoutId);
        if (PromptBox == undefined) {// 创建一个新的 div 元素
            var PromptBoxDiv = document.createElement('div');
            // 设置 id 属性
            PromptBoxDiv.id = 'PromptBox';
            // 将新创建的 div 添加到 body 中
            document.body.appendChild(PromptBoxDiv);
            // 添加样式
            PromptBox = document.getElementById('PromptBox');
            PromptBox.style = ` display: inline-block;
                                position: fixed;
                                background-color: #55ff55;
                                bottom: 15%;
                                left: 50%;
                                border-radius: 10px;
                                padding: 10px;
                                transform: translate(-50%);`;
        }
        PromptBox.style.display = "inline-block"; // 显示
        PromptBox.innerText = "您点击了>" + (e.key.charAt(0).toUpperCase() + e.key.slice(1)) + "<\n它的值为>" + e.keyCode + "<";
        this.keyTimeoutId = setTimeout(() => {
            PromptBox.style.display = "none"; // 隐藏
        }, 2000);
    }

    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 消息提示
     * @description 在屏幕下方以气泡的形式显示指定信息
     * @param {String} inf 消息文本
     * @param {Number} num 0:信息,1:成功,2:失败
     * @param {Number} times 显示时间
     */
    popup(inf, num, times = 3000) {
        let popup = document.getElementById('popup');
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
        clearTimeout(this.timeoutId);
        popup.style.backgroundColor = this.colors[num];
        popup.innerText = inf;
        popup.style.display = 'block';

        // 设置新的超时以隐藏3秒后的弹出窗口
        this.timeoutId = setTimeout(function () {
            popup.style.display = 'none';
        }, times);
    }

    //.  ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 序列化表单
     * @description 将表单内的数据序列化成对象或url字符串并进行url编码
     * @param { Object } formObj 表单对象
     * @param { boolean } isjson 是否返回json类型
     * @returns { Object || String } 返回序列结果
     */
    serialize(formObj, isjson) {
        let params = [];
        if (isjson) {
            params = {};
        }
        for (let i = 0; i < formObj.elements.length; i++) {
            let field = formObj.elements[i];
            /// 下拉框依旧可以处理
            /// 处理特殊类型
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
    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 回显表单数据
     * @description 将对象数据回显到表单内对象的key对应表单元素的name属性上
     * @param {Object} formObj 表单对象
     * @param {Object} obj  表单元素对象
     * @returns {void} 
     */
    showForm(formObj, obj) {
        let keys = Object.keys(obj);
        for (let i = 0; i < formObj.elements.length; i++) {
            let field = formObj.elements[i];
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
     * 封装基础的 AJAX 请求函数
     * @name  Ajax请求
     * @param {Object} options 配置参数
     * 
     *!@param {string} options.url 请求地址（必需）
     * @param {string} [options.method=GET] 请求方法（GET/POST/PUT/DELETE等）
     * @param {Object|string} [options.data] 请求数据（GET 时转为查询参数，POST 时作为请求体）
     * @param {Object} [options.headers={}] 自定义请求头
     * @param {number} [options.timeout=0] 超时时间（毫秒）
     * @param {string} [options.responseType] 响应类型（json/text/blob等）
     * @param {Function} [options.success] 成功回调函数（参数：响应数据）
     * @param {Function} [options.error] 失败回调函数（参数：错误信息）
     */
    ajaxRequest(options) {
        // 参数校验
        if (!options.url) throw new Error('URL is required');

        // 默认值处理
        const {
            method = 'GET',
            headers = {},
            data = null,
            timeout = 0,
            responseType = 'json',
            success = () => { },
            error = () => { }
        } = options;

        const xhr = new XMLHttpRequest();
        let url = options.url;

        // 处理 GET 请求的查询参数
        if (method.toUpperCase() === 'GET' && data) {
            const params = typeof data === 'string' ? data : new URLSearchParams(data).toString();
            url += (url.includes('?') ? '&' : '?') + params;
        }

        // 初始化请求
        xhr.open(method, url, true);

        // 设置响应类型
        xhr.responseType = responseType;

        // 设置超时
        xhr.timeout = timeout;

        // 设置请求头
        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });

        // 自动设置 Content-Type（如果未指定）
        if (method.toUpperCase() !== 'GET' && data && !headers['Content-Type']) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        // 处理请求体数据
        let requestBody = null;
        if (method.toUpperCase() !== 'GET' && data) {
            requestBody = typeof data === 'string' ? data : JSON.stringify(data);
        }

        // 事件监听
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = responseType === 'json' ? xhr.response : xhr.responseText;
                    success(response);
                } catch (e) {
                    error(`数据解析错误: ${e.message}`);
                }
            } else {
                error(`HTTP 错误: ${xhr.status} ${xhr.statusText}`);
            }
        };

        xhr.onerror = () => error('网络错误');
        xhr.ontimeout = () => error(`${timeout}ms后请求超时`);
        xhr.onabort = () => error('请求已中止');

        // 发送请求
        try {
            xhr.send(requestBody);
        } catch (e) {
            error(`请求错误: ${e.message}`);
        }
    }
    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 日期格式化
     * @description 将日期对象格式化成指定格式的字符串
     * @param {Date} date 日期对象
     * @param {String} fmt 格式化字符串
     * @returns {String} 格式化后的日期字符串
     */
    dateformat(date = new Date(), fmt = "yyyy-MM-dd hh:mm:ss.SSS") {
        function repair(num) {
            return (num < 10 ? ("0" + num) : num).toString();
        }
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
     * @name 计算过去时间
     * @description 计算过去时间
     * @param {Date} startTime 开始时间
     * @param {Date} endTime 结束时间
     * @returns {String} 返回过去时间
     */
    getElapsedTime(startTime, endTime = new Date()) {
        if (endTime < startTime) {
            return "时间错误";
        }
        let end = new Date(new Date(endTime) - new Date(startTime));
        let T = [end.getFullYear() - 1970, end.getMonth(), end.getDate() - 1, end.getHours() - 8, end.getMinutes(), end.getSeconds()];
        let res = (T[0] == 0 ? "" : T[0] + "年")
            + (T[1] == 0 ? "" : T[1] + "月")
            + (T[2] == 0 ? "" : T[2] + "天")
            + (T[3] == 0 ? "" : T[3] + "小时")
            + (T[4] == 0 ? "" : T[4] + "分")
            + (T[5] == 0 ? "" : T[5] + "秒");
        ;
        return res;
    };
    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 
    /**
     * @name 读取剪贴板
     * @description 读取剪贴板内容并返回Promise对象
     * @returns {Promise<string>}
     */
    async readClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            return text;
        } catch (error) {
            alert('读取剪贴板失败');
            console.error(error);
            return null;
        }
    }
    //. ========================== 分割线 ========================== 分割线 ========================== 分割线 ========================== 

}