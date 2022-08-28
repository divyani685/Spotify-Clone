let songIndex = 0;
let audioElement = new Audio("./mp3_songs/Let-Me-Love-You.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songNames = document.getElementById("songName");
let songItemPlay = document.getElementsByClassName("songItemPlay");

let songs = [
  {
    songName: "Let Me Love You",
    filePath: "./mp3_songs/Let-Me-Love-You.mp3",
    coverPath: "covers/let_me_love_you.jpg",
  },
  {
    songName: "Disco Deewane-Student of the Year",
    filePath: "./mp3_songs/Disco-Deewane.mp3",
    coverPath: "covers/disco-deewane.jpg",
  },
  {
    songName: "lucky to lucky me-Humpty Sharma Ki Dulhania",
    filePath: "./mp3_songs/lucky-to-lucky-me.mp3",
    coverPath: "covers/lucky-to-lucky-me.jpg",
  },
  {
    songName: "Party on my mind-Race 2",
    filePath: "./mp3_songs/party-on-my-mind.mp3",
    coverPath: "covers/party-on-my-mind.jpg",
  },
  {
    songName: "Ishq wala love-Student of the Year ",
    filePath: "./mp3_songs/Ishq-Wala-Love.mp3",
    coverPath: "covers/ishq-wala-love.jpg",
  },
  {
    songName: "Tere hoke rahenge-Raja Natwarlal",
    filePath: "./mp3_songs/Tere Hoke rahenge.mp3",
    coverPath: "covers/tere-hoke-rahenge.jpg",
  },
  {
    songName: "Beautiful - Akhil",
    filePath: "./mp3_songs/Beautiful - Akhil.mp3",
    coverPath: "covers/Beautiful.jpg",
  },
  {
    songName: "Dil Ibaadat-Tum Mile",
    filePath: "./mp3_songs/Dil Ibaadat-Tum Mile.mp3",
    coverPath: "covers/dil_ibadat.jpg",
  },
  {
    songName: "Kya Mujhe Pyar Hai (Woh Lamhe)",
    filePath: "./mp3_songs/Kya Mujhe Pyar Hai (Woh Lamhe).mp3",
    coverPath: "covers/kya_mujhe_pyar_hai.jpg",
  },
  {
    songName: "Arcade",
    filePath: "./mp3_songs/Arcade.mp3",
    coverPath: "covers/arcade.jpg",
  },
  {
    songName: "Mann Mera - Gajendra Verma",
    filePath: "./mp3_songs/Mann Mera - Gajendra Verma.mp3",
    coverPath: "covers/man_mera.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};
masterPlay.addEventListener("click", (element) => {
    console.log(audioElement.currentTime)
    console.log(audioElement.duration)
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element, i) => {
        if (i == songIndex) {
          element.classList.remove("fa-play");
          element.classList.add("fa-pause");
        }
      }
    );
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element, i) => {
        if (i == songIndex) {
          element.classList.remove("fa-pause");
          element.classList.add("fa-play");
        }
      }
    );
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  if(audioElement.currentTime==audioElement.duration)
      {
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName("songItemPlay")).forEach(
            (element, i) => {
              if (i == songIndex) {
                element.classList.remove("fa-pause");
                element.classList.add("fa-play");
              }
            }
          );
      }
});
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
  });
// Array.from(document.getElementsByClassName("time")).forEach((element)=>{
//     element.addEventListener("onloadedmetadata",(i)=>{
//         console.log(i.duration)
//         console.log(i.currentTime)
//     })
// })
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused) {
        makeAllPlays();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        songNames.innerText = songs[i].songName;
        songIndex = i;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
      } else {
        makeAllPlays();
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
        audioElement.src = songs[i].filePath;
        audioElement.currentTime =0;
        audioElement.pause();
        songNames.innerText = songs[i].songName;
        songIndex = i;
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
      }
    });
  }
);
document.getElementById("previous").addEventListener("click", (e) => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  makeAllPlays();
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  songNames.innerText = songs[songIndex].songName;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      if (i == songIndex) {
        element.classList.remove("fa-play");
        element.classList.add("fa-pause");
      }
    }
  );
});
document.getElementById("next").addEventListener("click", (e) => {
  makeAllPlays();
  if (songIndex >= songs.length) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  songNames.innerText = songs[songIndex].songName;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element, i) => {
      if (i == songIndex) {
        element.classList.remove("fa-play");
        element.classList.add("fa-pause");
      }
    }
  );
});
