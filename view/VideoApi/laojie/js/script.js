/// 表单相关函数--------------------------------
//。 解析按钮
document.getElementById('urlForm').addEventListener('submit', function (e) {
    e.preventDefault();
    parseVideo();
});


//。 解析并收藏按钮
document.getElementById('collect-parse-btn').addEventListener('click', function (e) {
    e.preventDefault();
    parseVideo(true);
});

//. 解析
function parseVideo(isCollect = false) {

    const select = document.getElementById('apiSelect');
    const input = document.getElementById('inputUrl');

    if (!input.value.trim()) {
        showToast('还没粘贴视频链接嘞姐急嫩很干啥', '#ff4d4f');
        return;
    }

    if (!select.value) {
        showToast('请选择接口', '#ff4d4f');
        return;
    }

    const apiUrl = select.value + encodeURIComponent(input.value) + "&vod_referrer=1";

    if (isCollect) {
        const newRecord = {
            id: new Date().getTime(),
            Url: apiUrl,
            name: formatDate(new Date().getTime())
        };
        saveToCollect(newRecord);
    } else {
        //。 保存到历史记录
        saveToHistory(apiUrl, isCollect);

        //。 在新标签打开
        window.open(apiUrl, '_blank');
        //。 在当前标签打开
        // window.location.href = apiUrl;
    }
}

//。 清除输入框
document.getElementById('clearUrl').addEventListener('click', function () {
    document.getElementById('inputUrl').value = '';
    this.style.display = 'none';
});

//。 输入框内容变化时，显示或隐藏清除按钮
document.getElementById('inputUrl').addEventListener('input', function () {
    const clearUrl = document.getElementById('clearUrl');
    clearUrl.style.display = this.value.trim() !== '' ? 'block' : 'none';
});

/// 历史记录相关函数--------------------------------
//。 保存到历史记录
function saveToHistory(Url, isCollect) {
    let history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    const newRecord = {
        id: new Date().getTime(),
        Url: Url,
        name: formatDate(new Date().getTime())
    };

    //. 如果isCollect为true，则保存到收藏夹
    if (isCollect) {
        saveToCollect(newRecord);
    }

    // 添加新记录到开头
    history.unshift(newRecord);

    // 只保留最近10条记录
    history = history.slice(0, 10);

    localStorage.setItem('videoHistory', JSON.stringify(history));
}

//。 切换历史记录显示状态
function toggleHistory() {
    const historyBox = document.getElementById('history-card-box');
    if (historyBox.style.display === 'none') {
        displayHistory();
        historyBox.style.display = 'flex';
    } else {
        historyBox.style.display = 'none';
    }
}

//。 显示历史记录
function displayHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');

    historyList.innerHTML = history.map((record, index) => {
        const name = index === 0 ? '上次看的' : record.name+"看的";
        return `
            <div class="history-item">
                <div class="history-item-content" data-url="${record.Url}">
                    <span>${name}</span>
                </div>
                <div class="history-item-actions">
                    <span class="history-item-collect" title="收藏" onclick="event.stopPropagation(); saveToCollect(${record.id})">❤️收藏</span>
                    <span class="history-item-delete" title="删除" onclick="event.stopPropagation(); deleteHistoryItem(${record.id})">🗑️删除</span>
                </div>
            </div>
        `;
    }).join('');

    // 为每个历史记录项添加点击事件
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function (e) {
            if (!e.target.closest('.history-item-actions')) {
                const url = this.querySelector('.history-item-content').getAttribute('data-url');
                window.open(url, '_blank');
            }
        });
    });
}

//。 格式化日期
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日 ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

//。 日期补零
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

/// 收藏夹相关函数--------------------------------

//. 切换收藏夹显示状态
function toggleCollect() {
    const collectBox = document.getElementById('collect-card-box');
    if (collectBox.style.display === 'none') {
        displayCollect();
        collectBox.style.display = 'flex';
    } else {
        collectBox.style.display = 'none';
    }
}

//。 显示收藏夹
function displayCollect() {
    const collectList = document.getElementById('collectList');
    const collect = JSON.parse(localStorage.getItem('videoCollect') || '[]');
    collectList.innerHTML = collect.map((record, index) => {
        return `
            <div class="collect-item">
                <div class="collect-item-content" data-url="${record.Url}">
                    <span>${record.name}</span>
                </div>
                <div class="collect-item-actions">
                    <span class="collect-item-edit" title="编辑" onclick="event.stopPropagation(); editCollectItem(${record.id})">✏️命名</span>
                    <span class="collect-item-delete" title="删除" onclick="event.stopPropagation(); deleteCollectItem(${record.id})">🗑️删除</span>
                </div>
            </div>
        `;
    }).join('');

    // 为每个收藏项添加点击事件
    document.querySelectorAll('.collect-item').forEach(item => {
        item.addEventListener('click', function (e) {
            if (!e.target.closest('.collect-item-actions')) {
                const url = this.querySelector('.collect-item-content').getAttribute('data-url');
                window.open(url, '_blank');
            }
        });
    });
}

//。 保存到收藏夹
function saveToCollect(obj) {
    //. 如果obj是数字，则从历史记录中获取
    let history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    typeof obj === 'number' ? obj = history.find(item => item.id === obj) : null;

    let collect = JSON.parse(localStorage.getItem('videoCollect') || '[]');
    // 弹出命名窗口
    const newName = prompt('请输入收藏名称：', obj.name);
    if (newName && newName.trim()) {
        obj.name = newName.trim();
        collect.push(obj);
        localStorage.setItem('videoCollect', JSON.stringify(collect));
        showToast('已收藏');
    }
}

// 删除收藏项
function deleteCollectItem(id) {
    if (confirm('确定要删除这条收藏吗？')) {
        let collect = JSON.parse(localStorage.getItem('videoCollect') || '[]');
        collect = collect.filter(item => item.id !== id);
        localStorage.setItem('videoCollect', JSON.stringify(collect));
        displayCollect();
        showToast('删除成功');
    }
}

// 编辑收藏项
function editCollectItem(id) {
    let collect = JSON.parse(localStorage.getItem('videoCollect') || '[]');
    let record = collect.find(item => item.id === id);
    if (record) {
        const newName = prompt('请输入新的名称：', record.name);
        if (newName && newName.trim()) {
            record.name = newName.trim();
            localStorage.setItem('videoCollect', JSON.stringify(collect));
            displayCollect();
            showToast('修改成功');
        }
    }
}

/// 其他函数--------------------------------
//。 显示提示框
function showToast(text, color = '#4CAF50') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.backgroundColor = color;
    toast.textContent = text;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


//。 显示官方网站
function toggleOfficial() {
    let Official_card_box = document.getElementById('Official-card-box');
    if (Official_card_box.style.display === 'none') {
        Official_card_box.style.display = 'flex';
    } else {
        Official_card_box.style.display = 'none';
    }
}

// 删除历史记录
function deleteHistoryItem(id) {
    if (confirm('确定要删除这条记录吗？')) {
        let history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
        history = history.filter(item => item.id !== id);
        localStorage.setItem('videoHistory', JSON.stringify(history));
        displayHistory();
        showToast('删除成功');
    }
}

// 清空历史记录
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？')) {
        localStorage.setItem('videoHistory', JSON.stringify([]));
        displayHistory();
        showToast('历史记录已清空');
    }
}

// 编辑历史记录
function editHistoryItem(id) {
    let history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    let record = history.find(item => item.id === id);
    if (record) {
        const newName = prompt('请输入新的名称：', record.name);
        if (newName && newName.trim()) {
            record.name = newName.trim();
            localStorage.setItem('videoHistory', JSON.stringify(history));
            displayHistory();
            showToast('修改成功');
        }
    }
}

// 清空收藏夹
function clearCollect() {
    if (confirm('确定要清空所有收藏吗？')) {
        localStorage.setItem('videoCollect', JSON.stringify([]));
        displayCollect();
        showToast('收藏夹已清空');
    }
}