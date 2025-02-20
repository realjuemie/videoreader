// 播放按钮点击事件
document.getElementById('play-btn').addEventListener('click', function () {
    const videoUrl = document.getElementById('video-url').value;
    const videoFrame = document.getElementById('video-frame');

    if (videoUrl) {
        videoFrame.src = videoUrl;
    } else {
        alert('请输入有效的视频链接！');
    }
});

// 上传文件并生成播放列表
document.getElementById('file-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            const urls = content.match(/https?:\/\/[^\s]+/g); // 提取 URL
            if (urls) {
                const playlist = document.getElementById('playlist');
                playlist.innerHTML = ''; // 清空现有列表
                urls.forEach(url => {
                    const li = document.createElement('li');
                    li.textContent = url;
                    li.addEventListener('click', function () {
                        document.getElementById('video-frame').src = url;
                    });
                    playlist.appendChild(li);
                });
            } else {
                alert('未找到有效的 URL 链接！');
            }
        };
        reader.readAsText(file);
    }
});

// 获取弹窗和按钮元素
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

// 赞赏按钮点击事件
document.getElementById('appreciate-button').addEventListener('click', function () {
    modal.style.display = 'block'; // 显示弹窗
    modalImage.src = 'https://i2.mjj.rip/2024/06/13/a7aa1d190d4cc863e6f8ef3667acaa96.png'; // 设置赞赏图片
});

// 红包按钮点击事件
document.getElementById('red-envelope-button').addEventListener('click', function () {
    modal.style.display = 'block'; // 显示弹窗
    modalImage.src = 'https://i2.mjj.rip/2024/06/13/c2622e6d82796ddfaaef266baf6d3325.jpeg'; // 设置红包图片
});

// 关闭按钮点击事件
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'; // 隐藏弹窗
});

// 点击弹窗外部关闭弹窗
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // 隐藏弹窗
    }
});

// 更新时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('current-time').textContent = `当前时间: ${timeString}`;
}

setInterval(updateTime, 1000);
updateTime();