export function initBackgroundVideo() {
    const videoHorizontal = document.querySelector('.video-horizontal');
    const videoVertical = document.querySelector('.video-vertical');

    if (!videoHorizontal || !videoVertical) return;

    videoHorizontal.src = '/wedding-website/video/horizontal.mp4';
    videoVertical.src = '/wedding-website/video/vertical.mp4';

    function updateVideo() {
        const aspectRatio = window.innerHeight / window.innerWidth;

        if (aspectRatio > 1.2) {
            videoHorizontal.style.display = 'none';
            videoVertical.style.display = 'block';
        } else {
            videoHorizontal.style.display = 'block';
            videoVertical.style.display = 'none';
        }
    }

    updateVideo();
    window.addEventListener('resize', updateVideo);
}

// Автоинициализация
document.addEventListener("DOMContentLoaded", initBackgroundVideo);

