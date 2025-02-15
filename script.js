// 初始化
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const manualInput = document.getElementById("manual-input");
    const submitButton = document.getElementById("submit-button");
    const videoSelect = document.getElementById("video-select");
    const videoFrame = document.getElementById("video-frame");
    const title = document.querySelector(".title");
    const description = document.querySelector(".description");

    let videoList = [];

    // 文件上传处理
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            videoList = parseVideoFile(content);
            populateVideoSelect(videoList);
        };
        reader.readAsText(file);
    });

    // 手动输入处理
    manualInput.addEventListener("input", () => {
        const link = manualInput.value;
        // 判断链接是否包含 short.ink 或 short.icu
        const isValidLink = link.includes("short.ink") || link.includes("short.icu");
        submitButton.disabled = !isValidLink;
    });

    submitButton.addEventListener("click", () => {
        const link = manualInput.value;
        if (link) {
            // 显示验证成功弹窗
            showSuccessModal("验证成功，加载中...");

            // 模拟加载过程
            setTimeout(() => {
                updateVideo("自定义视频", link, "");
                closeModal("success-modal"); // 关闭验证成功弹窗
            }, 2000); // 2秒后加载完成
        }
    });

    // 视频选择处理
    videoSelect.addEventListener("change", (event) => {
        const selectedIndex = event.target.value;
        const selectedVideo = videoList[selectedIndex];
        updateVideo(selectedVideo.title, selectedVideo.link, selectedVideo.description);
    });

    // 弹窗处理
    document.getElementById("appreciation-button").addEventListener("click", () => {
        showModal("https://i2.mjj.rip/2024/06/13/a7aa1d190d4cc863e6f8ef3667acaa96.png");
    });

    document.getElementById("red-envelope-button").addEventListener("click", () => {
        showModal("https://i2.mjj.rip/2024/06/13/c2622e6d82796ddfaaef266baf6d3325.jpeg");
    });

    // 关闭弹窗
    document.querySelectorAll(".close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none";
            });
        });
    });

    // 点击遮罩关闭弹窗
    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // 显示公告弹窗
    showAnnouncement();

    // 更新时间
    setInterval(updateTime, 1000);
});

// 解析视频文件
function parseVideoFile(content) {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    const videos = [];
    for (let i = 0; i < lines.length; i += 3) {
        videos.push({
            title: lines[i],
            link: lines[i + 1],
            description: lines[i + 2],
        });
    }
    return videos;
}

// 填充视频选择框
function populateVideoSelect(videos) {
    const select = document.getElementById("video-select");
    select.innerHTML = "";
    videos.forEach((video, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = video.title;
        select.appendChild(option);
    });
    if (videos.length > 0) {
        updateVideo(videos[0].title, videos[0].link, videos[0].description);
    }
}

// 更新视频
function updateVideo(title, link, description) {
    document.querySelector(".title").textContent = title;
    document.getElementById("video-frame").src = link;
    document.querySelector(".description").value = description;
}

// 显示弹窗
function showModal(imageUrl) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    modalImage.src = imageUrl;
    modal.style.display = "flex";
}

// 显示公告弹窗
function showAnnouncement() {
    const modal = document.getElementById("announcement-modal");
    modal.style.display = "flex";
}

// 显示验证成功弹窗
function showSuccessModal(message) {
    const modal = document.getElementById("success-modal");
    const modalMessage = document.getElementById("success-message");
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

// 关闭指定弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// 更新时间
function updateTime() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    document.getElementById("current-date-time").textContent = `当前日期和时间：${dateString} ${timeString}`;
}