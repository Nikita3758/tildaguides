document.addEventListener('DOMContentLoaded', () => {
    const videoButtons = document.querySelectorAll('.btn-lesson');
    const videoModal = document.getElementById('videoModal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoClose = document.querySelector('.video-close');

    if (!videoModal || !youtubePlayer || !videoClose) return;

    // Открытие модалки
    videoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video');
            if (videoId) {
                youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Закрытие модалки
    const closeVideoModal = () => {
        videoModal.style.display = 'none';
        youtubePlayer.src = '';
        document.body.style.overflow = '';
    };

    videoClose.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });
});