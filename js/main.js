const song = document.querySelector('#song'); 
const title =  document.querySelector(".title"); 
const artist =  document.querySelector(".artist");
const art =  document.querySelector(".art"); 
const playPause = document.querySelector('.pauseplay');
const next =  document.querySelector(".next"); 
const previous = document.querySelector('.previous');
const progressBar = document.querySelector('.progress-bar');
const current =  document.querySelector(".current"); 
const duration = document.querySelector('.duration');
const forward =  document.querySelector(".forward"); 
const backward = document.querySelector('.rewind');
let newTime;
let playing = true;

let songIndex = 0;

let songs = [  
    {
     audioLink: './songs/Congratulations.mp3',
     artImage:'./img/Congratulations.jpg',
     artiste:'Post Malone'
    },
    {
        audioLink: './songs/Fast.mp3',
        artImage:'./img/Fast.jpg',
        artiste:'Juixwrld'
    },
    {
        audioLink: './songs/Maze.mp3',
        artImage:'./img/Maze.jpg',
        artiste:'Juixwrld'
    },
    {
        audioLink: './songs/The Box.mp3',
        artImage:'./img/TheBox.jpg',
        artiste:'Roody Rich'
    }
]; 



let playAndPause = () => {
    if (playing) {
        playPause.classList.remove("flaticon-play");
        playPause.classList.add("flaticon-pause") ;
        song.play();
        playing = false;
    } else {
        playPause.classList.remove("flaticon-pause") ;
        playPause.classList.add("flaticon-play");
        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', () => {
    nextSong();
});

playPause.addEventListener('click', () => {
    playAndPause();
});

next.addEventListener('click', () => {
   nextSong();
});

previous.addEventListener('click', () => {
   previousSong();
});

forward.addEventListener('click', () => {
   newTime = song.currentTime +  10;
   song.currentTime = newTime;
   let played = song.currentTime * 100 / song.duration;
   progressBar.style.transition = "all .1s";
   progressBar.style.width = `${played}%`;
 });
 
 backward.addEventListener('click', () => {
    newTime = song.currentTime -  10;
    song.currentTime = newTime;
    let played = song.currentTime * 100 / song.duration;
    progressBar.style.transition = "all .1s";
    progressBar.style.width = `${played}%`;
 });


let nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    let {audioLink,artImage,artiste} = songs[songIndex];
    song.src = audioLink;
    art.src =  artImage;
    artist.textContent = artiste;
    title.textContent = audioLink.split("/")[2].split(".")[0];
    progressBar.style.transition = "all .1s";
    progressBar.style.width = "0%";

    playing = true;
    playAndPause();
}

let previousSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex =  songs.length - 1;
    };
    let {audioLink,artImage,artiste} = songs[songIndex];
    song.src = audioLink;
    art.src =  artImage;
    artist.textContent = artiste;
    title.textContent = audioLink.split("/")[2].split(".")[0];
    progressBar.style.transition = "all .1s";
    progressBar.style.width = "0%";

    playing = true;
    playAndPause();
}

let formatTime = (seconds) => {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};


let updateProgressValue = () => {
   let remainning = formatTime(song.duration - song.currentTime); 
   let played = song.currentTime * 100 / song.duration;
   progressBar.style.transition = "all .1s";
   progressBar.style.width = `${played}%`;
   current.innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (duration.innerHTML === "NaN:NaN") {
        duration.innerHTML = "0:00";
    } else {
        duration.innerHTML =  remainning;
    }
};

setInterval(updateProgressValue, 10);
