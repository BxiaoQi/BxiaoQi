

document.getElementById('urlForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const select = document.getElementById('apiSelect');
    const input = document.getElementById('inputUrl');

    if (!input.value.trim()) {
        showToast('你还没填链接呢🤷‍♂️', '#ff4d4f');
        return;
    }

    if (!select.value) {
        showToast('你还没选用哪个方案嘞🤷‍♂️', '#ff4d4f');
        return;
    }


    const apiUrl = select.value + encodeURIComponent(input.value) + "&vod_referrer=1";
    // 在新标签打开
    // window.open(apiUrl, '_blank');
    // 在当前标签打开
    window.location.href = apiUrl;
});

document.getElementById('inputUrl').addEventListener('blur', function () {
    const url = this.value;
    this.setValidity(url.startsWith('http://') || url.startsWith('https://'));
    document.getElementById('urlHelp').style.display = this.checkValidity() ? 'none' : 'block';
});


document.getElementById('Officialbtn').addEventListener('click', function () {
    isShow()
});

function isShow() {
    let Official_card_box = document.getElementById('Official-card-box');
    if (Official_card_box.style.display === 'none') {
        Official_card_box.style.display = 'flex';
    } else {
        Official_card_box.style.display = 'none';
    }
}


// 显示提示框
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