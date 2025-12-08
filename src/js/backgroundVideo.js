import horizontalVideo from '../video/horizontal.mp4';
import verticalVideo from '../video/vertical.mp4';

export function initBackgroundVideo() {
    const videoHorizontal = document.querySelector('.video-horizontal');
    const videoVertical = document.querySelector('.video-vertical');

    if (!videoHorizontal || !videoVertical) return;

    videoHorizontal.src = horizontalVideo;
    videoVertical.src = verticalVideo;

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

document.addEventListener("DOMContentLoaded", initBackgroundVideo);
