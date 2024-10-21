document.addEventListener('DOMContentLoaded', () => {
    const timerCircle = document.getElementById('timer-circle');
    const timerText = document.getElementById('timer-text');
    const startButton = document.getElementById('start-button');
    const exerciseTitle = document.getElementById('exercise-title');

    let duration;
    let timeLeft;
    let timerInterval;

    // Set duration based on the exercise title
    if (exerciseTitle.textContent.includes('05-Minute')) {
        duration = 5 * 60;
    } else if (exerciseTitle.textContent.includes('10-Minute')) {
        duration = 10 * 60;
    } else if (exerciseTitle.textContent.includes('15-Minute')) {
        duration = 15 * 60;
    } else {
        duration = 5 * 60; // Default to 5 minutes
    }

    timeLeft = duration;

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
            return;
        }

        const progress = (duration - timeLeft) / duration;
        const dashOffset = 565.48 * (1 - progress);
        timerCircle.style.strokeDashoffset = dashOffset;

        timerText.textContent = formatTime(timeLeft);
    }

    function startTimer() {
        timeLeft = duration;
        timerText.textContent = formatTime(timeLeft);
        timerCircle.style.strokeDashoffset = 565.48;
        startButton.textContent = "In Progress";
        startButton.disabled = true;

        timerInterval = setInterval(updateTimer, 1000);
    }

    startButton.addEventListener('click', startTimer);

    // Initialize timer display
    timerText.textContent = formatTime(duration);
});
        let timer;
        let timeLeft = 900; // 15 minutes in seconds
        const audio = document.getElementById('meditation-audio');
        const volumeSlider = document.getElementById('volume-slider');
        const startButton = document.getElementById('start-button');
        const timerCircle = document.getElementById('timer-circle');
        const timerText = document.getElementById('timer-text');
        const meditationStatus = document.getElementById('meditation-status');
        const FULL_DASH_ARRAY = 565.48; // Circumference of the circle

        // Set initial volume
        audio.volume = 0.7;

        // Handle volume changes
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });

        function startMeditation() {
            startButton.disabled = true;
            audio.play();
            meditationStatus.textContent = "Meditation in progress...";
            
            timer = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                if (timeLeft <= 0) {
                    endMeditation();
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Update circle progress
            const progress = (timeLeft / 900) * FULL_DASH_ARRAY;
            timerCircle.style.strokeDashoffset = FULL_DASH_ARRAY - progress;
        }

        function endMeditation() {
            clearInterval(timer);
            audio.pause();
            audio.currentTime = 0;
            meditationStatus.textContent = "Meditation complete";
            startButton.disabled = false;
            timerText.textContent = "15:00";
            timeLeft = 900;
        }

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                audio.pause();
            } else {
                if (timer && timeLeft > 0) {
                    audio.play();
                }
            }
        });
    