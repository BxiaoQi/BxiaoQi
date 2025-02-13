// 禁止保存页面
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        alert('禁止保存页面');
        return false;
    }
});

// 禁用拖拽保存
document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
});

// 禁用右键保存
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
});
// 禁用右键菜单
document.oncontextmenu = function () {
    return false;
};

// 禁用F12键
document.onkeydown = function (e) {
    if (e.keyCode === 123) {
        return false;
    }
};

// 禁用开发者工具
function disableDevTools() {
    if (window.devtools.isOpen) {
        window.location.href = "about:blank";
    }
}

// 检测开发者工具的打开状态
Object.defineProperty(window, 'devtools', {
    get: function () {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;
        return {
            isOpen: widthThreshold || heightThreshold,
        };
    },
});

// 定期检查开发者工具状态
setInterval(disableDevTools, 1000);