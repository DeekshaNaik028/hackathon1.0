document.addEventListener('DOMContentLoaded', () => {
    const timerCircle = document.getElementById('timer-circle');
    const timerText = document.getElementById('timer-text');
    const startButton = document.getElementById('start-button');
    const audioElement = document.getElementById('meditation-audio');
    const volumeControl = document.getElementById('volume-control');
    const audioControls = document.getElementById('audio-controls');

    const audioUrl = "https://open.spotify.com/track/2zqIb3cnQSqe2K2qGZHSrd?si=07e42a24f75e4f50";
    audioElement.src = audioUrl;


    const duration = 15 * 60; // 15 minutes
    let timeLeft = duration;
    let timerInterval;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimer() {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerText.textContent = "Done!";
            startButton.textContent = "Restart";
            startButton.disabled = false;
            audioElement.pause();
            audioElement.currentTime = 0;
            audioControls.style.display = 'none';
            return;
        }

        const progress = (duration - timeLeft) / duration;
        const dashOffset = 565.48 * (1 - progress);
        timerCircle.style.strokeDashoffset = dashOffset;

        timerText.textContent = formatTime(timeLeft);
    }

    function startMeditation() {
        timeLeft = duration;
        timerText.textContent = formatTime(timeLeft);
        timerCircle.style.strokeDashoffset = 565.48;
        startButton.textContent = "Meditating...";
        startButton.disabled = true;

        audioElement.play();
        audioControls.style.display = 'block';

        timerInterval = setInterval(updateTimer, 1000);
    }

    startButton.addEventListener('click', startMeditation);

    volumeControl.addEventListener('input', (e) => {
        audioElement.volume = e.target.value;
    });

    // Initialize audio volume
    audioElement.volume = volumeControl.value;
});
