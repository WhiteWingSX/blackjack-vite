let music = document.getElementById('backgroundAudio');

const playButton = document.getElementById('playButton'),
      pauseButton = document.getElementById('pauseButton');

pauseButton.addEventListener('click', function() {
    music.pause();
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
});

playButton.addEventListener('click', function() {
    music.play();
    music.volume = 0.1;
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
});


