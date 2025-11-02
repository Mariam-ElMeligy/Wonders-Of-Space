// Copyright (c) 2024 Mariam El-Meligy
// This project is licensed under the MIT License

function showMessage() {
    document.getElementById('messageBox').classList.toggle('show');
}

// Custom Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audioElement');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeLevel = document.getElementById('volumeLevel');
            
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
            
    // Update progress bar as audio plays
    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
                
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
                    
            // Update time display
            currentTimeEl.textContent = formatTime(currentTime);
            durationEl.textContent = formatTime(duration);
        }
    });
            
    // Click on progress bar to seek
    progressContainer.addEventListener('click', function(e) {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
            
    // Volume control
    volumeSlider.addEventListener('click', function(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.volume = percent;
        volumeLevel.style.width = `${percent * 100}%`;
    });
            
    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
            
    // Initialize volume
    audio.volume = 0.7;
    volumeLevel.style.width = '70%';
            
    // Shooting stars animation
    createShootingStars();
});

// Create shooting stars
function createShootingStars() {
    const numStars = 15;
            
    for (let i = 0; i < numStars; i++) {
        createShootingStar(i * 2000);
    }
            
    function createShootingStar(delay) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.classList.add('shooting-star');
                    
            // Random position
            const startX = Math.random() * window.innerWidth * 0.8;
            const startY = Math.random() * window.innerHeight * 0.3;
                    
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
                    
            // Random size and duration
            const size = 2 + Math.random() * 3;
            const duration = 2 + Math.random() * 3;
                    
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
                    
            document.body.appendChild(star);
                    
            // Animate the star
            star.style.animation = `shoot ${duration}s linear forwards`;
                    
            // Remove star after animation completes
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, duration * 1000);
                    
            // Create next star
            createShootingStar(3000 + Math.random() * 7000);
        }, delay);
    }
}