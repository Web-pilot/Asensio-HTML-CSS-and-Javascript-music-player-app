const playBtn = document.getElementById("btn-play");
let music = document.getElementById("music");
let playAndPauseIcon = document.getElementById("toggle-play-and-pause");
const progress = document.getElementById("progress");
const prenext = document.getElementById("prenextBtn");
const nextBtn = document.getElementById("nextBtn");
let albumCover = document.getElementById("albumCover");
let trackTitle = document.querySelector(".track__title");
let artistName = document.querySelector(".artist__name");
const songQuantity = document.querySelector(".song_quantity");
const musicTimeDisplay = document.querySelector(".music__time__display");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const reapeat = document.getElementById("repeat");
const repeatIcon = document.getElementById("repeatIcon");
const shuffle = document.getElementById("shuffle");

const musics = [
  {
    id: 1,
    title: "Paloma",
    artist: "Mr P ft Singah",
    audioPath: "assets/Mr-P-Ft-Singah-Paloma.mp3",
    albumCover: "assets/Mr-P-The-Prodigal-Album-Artwork2.png",
  },

  {
    id: 2,
    title: "Love",
    artist: "Burna Boy",
    audioPath: "assets/Burna-Boy-Love.mp3",
    albumCover: "assets/Burna-Boy-No-Sign-Of-Weakness-AlbumArtwork1.jpg",
  },

  {
    id: 3,
    title: "Just Like That",
    artist: "Mr P ft Mohombi",
    audioPath: "assets/Mr-P-Ft-Mohombi-Just-Like-That.mp3",
    albumCover: "assets/Mr-P-Ft-Mohombi-Just-Like-That-Artwork.jpg",
  },
];

let counter = 2;
let loop = false;
let isSeeking = false;


const firstAudio = musics[0];
music.src = firstAudio.audioPath;
albumCover.src = firstAudio.albumCover;
trackTitle.innerHTML = firstAudio.title;
artistName.innerHTML = firstAudio.artist;
songQuantity.innerHTML = `1 | ${musics.length}`;
updateProgressBar;

music.addEventListener("timeupdate", () => {
  updateTimeDisplayer(music);

  if (music.paused) {
    playAndPauseIcon.className = "fa-solid fa-play";
  } else {
    playAndPauseIcon.className = "fa-solid fa-pause";
  }
  if (music.ended) {
    playAndPauseIcon.className = "fa-solid fa-play";
    music.currentTime = 0;
    if (!loop) nextBtn.click();
  }
});

// FORMATTING THE MUSIC TIME
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function updateTimeDisplayer(music) {
  if (!isNaN(music.duration)) {
    const musicDuration = formatTime(music.duration);
    const musicCurrentTime = formatTime(music.currentTime);

    musicTimeDisplay.innerHTML = `${musicCurrentTime} / ${musicDuration}`;
  }
}

// PROGRESS BAR UPDATE
function updateProgressBar() {
  music.addEventListener("timeupdate", () => {
    const progressPercent = (music.currentTime / music.duration) * 100;
    progress.value = progressPercent;
  });
}

//NEXT BUTTON FUNCTION
playBtn.addEventListener("click", () => {
  if (music.paused) {
    const seekTime = (progress.value / 100) * music.duration;
    music.currentTime = seekTime;

    music.play();
    playAndPauseIcon.className = "fa-solid fa-play";
    updateProgressBar();
  } else {
    music.pause();
    playAndPauseIcon.className = "fa-solid fa-pause";
    updateProgressBar();
  }
});

//BACKWARD BUTTON FUNCTION
nextBtn.addEventListener("click", () => {
  playAndPauseIcon.className = "fa-solid fa-pause";

  musics.forEach((audio) => {
    if (audio.id == counter) {
      music.src = audio.audioPath;
      albumCover.src = audio.albumCover;
      trackTitle.innerHTML = audio.title;
      artistName.innerHTML = audio.artist;
      music.play();
      songQuantity.innerHTML = `${audio.id} | ${musics.length}`;
      updateProgressBar();
    }
  });

  counter++;
  if (counter == 4) {
    counter = 1;
  }
});

prenext.addEventListener("click", () => {
  playAndPauseIcon.className = "fa-solid fa-pause";

  musics.forEach((audio) => {
    if (audio.id == counter) {
      music.src = audio.audioPath;
      albumCover.src = audio.albumCover;
      trackTitle.innerHTML = audio.title;
      artistName.innerHTML = audio.artist;
      music.play();
      songQuantity.innerHTML = `${audio.id} | ${musics.length}`;
      updateProgressBar();
    }
  });

  counter--;
  if (counter == 0) {
    counter = 3;
  }
});


// Seek audio in real time
progress.addEventListener("mousedown", () => {
  isSeeking = true;
  music.pause();
  updateProgressBar();
});

//  While dragging
progress.addEventListener("input", () => {
  if (music.duration) {
    const seekTime = (progress.value / 100) * music.duration;
    music.currentTime = seekTime;
    music.play();
    updateProgressBar();
  }
});

// VOLUME CONTROL BUTTON
volume.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    volumeIcon.className = "fa-solid fa-volume-high";
    volumeIcon.style.color = "inherit";
  } else {
    music.muted = true;
    volumeIcon.className = "fa-solid fa-volume-xmark";
    volumeIcon.style.color = "red";
  }
});

//LOOP MUSIC CODE 
reapeat.addEventListener("click", () => {
  if (loop == false) {
    reapeat.classList.add("repeat-1");
    loop = true;
    music.loop = loop;
  } else {
    reapeat.classList.remove("repeat-1");
    loop = false;
    music.loop = loop;
  }
});
