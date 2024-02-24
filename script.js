let isPlaying = false;
let currentSongIndex = 0;
const audioElement = document.getElementById('myAudio');
const seekBar = document.querySelector('.seek-bar');
const coverArtElement = document.getElementById('coverArt');
const songQueue = [
  { src: "01 I Forgot That You Existed.mp3", cover: 'lover.jpg', title: "I Forgot That You Existed" },
  { src: "02 Cruel Summer.mp3", cover: 'lover.jpg', title: "Cruel Summer" },
  { src: "03 Lover.mp3", cover: 'lover.jpg', title: "Lover" },
  { src: "04 The Man.mp3", cover: 'lover.jpg', title: "The Man" },
  { src: "05 The Archer.mp3", cover: 'lover.jpg', title: "The Archer" },
  { src: "06 I Think He Knows.mp3", cover: 'lover.jpg', title: "I Think He Knows" },
  { src: "07 Miss Americana & The Heartbreak P.mp3", cover: 'lover.jpg', title: "Miss Americana & The Heartbreak P" },
  { src: "08 Paper Rings.mp3", cover: 'lover.jpg', title: "Paper Rings" },
  { src: "09 Cornelia Street.mp3", cover: 'lover.jpg', title: "Cornelia Street" },
  { src: "10 Death By A Thousand Cuts.mp3", cover: 'lover.jpg', title: "Death By A Thousand Cuts" },
  { src: "11 London Boy.mp3", cover: 'lover.jpg', title: "London Boy" },
  { src: "12 Soon You'll Get Better (feat. Dix.mp3", cover: 'lover.jpg', title: "Soon You'll Get Better (feat. Dix" },
  { src: "13 False God.mp3", cover: 'lover.jpg', title: "False God" },
  { src: "14 You Need To Calm Down.mp3", cover: 'lover.jpg', title: "You Need To Calm Down" },
  { src: "15 Afterglow.mp3", cover: 'lover.jpg', title: "Afterglow" },
  { src: "16 ME! (feat. Brendon Urie of Panic!.mp3", cover: 'lover.jpg', title: "ME! (feat. Brendon Urie of Panic!" },
  { src: "17 It's Nice To Have A Friend.mp3", cover: 'lover.jpg', title: "It's Nice To Have A Friend" },
  { src: "18 Daylight.mp3", cover: 'lover.jpg', title: "Daylight" },

];

function togglePlayPause() {
  const playPauseButton = document.querySelector('.play-pause');
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseButton.textContent = 'Pause';
    playCurrentSong();
  } else {
    playPauseButton.textContent = 'Play';
    audioElement.pause();
  }
}

audioElement.addEventListener('ended', playNext);

let isShuffleMode = false;
let shuffledQueue = [];

function toggleShuffleMode() {
  isShuffleMode = !isShuffleMode;

  if (isShuffleMode) {
    shuffledQueue = shuffleArray([...songQueue]);
    document.querySelector('.shuffle').textContent = 'Shuffle: On';
  } else {
    shuffledQueue = [];
    document.querySelector('.shuffle').textContent = 'Shuffle: Off';
  }

  updateQueue();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playNext() {
  if (isShuffleMode) {
    if (shuffledQueue.length === 0) {
      shuffledQueue = shuffleArray([...songQueue]);
    }
    currentSongIndex = songQueue.indexOf(shuffledQueue.shift());
  } else {
    currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  }

  // Update play/pause button text based on playback state
  const playPauseButton = document.querySelector('.play-pause');

  // Check if the audio is paused, update button text accordingly
  if (audioElement.paused) {
    playPauseButton.textContent = 'Play';
  } else {
    playPauseButton.textContent = 'Pause';
  }

  playCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
  playCurrentSong();
}

const currentSongTitleElement = document.getElementById('currentSongTitle');

function playCurrentSong() {
  const currentSong = songQueue[currentSongIndex];
  audioElement.src = currentSong.src;
  coverArtElement.src = currentSong.cover;
  currentSongTitleElement.textContent = currentSong.title; // Display the title
  audioElement.play();
  updateQueue();
}

function updateQueue() {
  const songQueueElement = document.getElementById('songQueue');
  songQueueElement.innerHTML = '';

  const displayQueue = isShuffleMode ? shuffledQueue : songQueue;

  displayQueue.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title}`;
    if (isShuffleMode && currentSongIndex === songQueue.indexOf(song)) {
      listItem.classList.add('current-song-shuffle');
    } else if (!isShuffleMode && currentSongIndex === index) {
      listItem.classList.add('current-song');
    }
    songQueueElement.appendChild(listItem);
  });
}


function handleQueueItemClick(event) {
  console.log('Queue item clicked!');
  // ... (rest of the function)
}



// ... (rest of the code)



// ... (rest of the code)


function updateSeekBar(value) {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = (value / 100) * duration;

  audioElement.currentTime = currentTime;
  currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;



  seekBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
});

// ... (previous JavaScript code)

const totalTimeElement = document.querySelector('.total-time');

audioElement.addEventListener('loadedmetadata', updateTotalTime);

function updateTotalTime() {
  const totalMinutes = Math.floor(audioElement.duration / 60);
  const totalSeconds = Math.floor(audioElement.duration % 60);
  totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// ... (rest of the JavaScript code)


// Optional: Auto-play the first song on page load
window.addEventListener('load', () => {
  playCurrentSong();
});

