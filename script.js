const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Clean-Bandit-Symphony.mp3",
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
  },
  {
    title: "Instant Crush",
    name: "Daft Punk ft. Julian Casablancas",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Daft-Punk-Instant-Crush.mp3",
  },
  {
    title: "As It Was",
    name: "Harry Styles",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
  },
  {
    title: "Physical",
    name: "Dua Lipa",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Dua-Lipa-Physical.mp3",
  },
  {
    title: "Delicate",
    name: "Taylor Swift",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Taylor-Swift-Delicate.mp3",
  },
  {
    title: "Astronaut in the Ocean",
    name: "Masked Wolf",
    source:
      "C:/Users/hcps-rosenem/Music/Astronaut in the Ocean - Masked Wolf.mp3",
  },
];

let currentSongIndex = 3;

// Initialize Swiper
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: currentSongIndex,
  slidesPerView: "auto",
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
  allowTouchMove: true,
  on: {
    slideChange: function () {
      // Update song when active slide changes
      const newIndex = this.activeIndex;

      if (newIndex !== currentSongIndex) {
        currentSongIndex = newIndex;
        updateSongInfo();
        playSong();
      }
    },
  },
});

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  // Reset progress bar when a new song is loaded
  song.addEventListener("loadedmetadata", function () {
    progress.max = song.duration;
    progress.value = 0;
  });
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  if (song.paused) {
    playSong(); // Resume playing after seeking
  }
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); // Sync Swiper with song
  playSong();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); // Sync Swiper with song
  playSong();
});

// Autoplay next song when the current song ends
song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); // Scroll to the active slide
  playSong();
});

updateSongInfo();
