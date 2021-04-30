// ELEMENTS 
const audio = document.querySelector(".audio");
const playerContainer = document.querySelector(".player-container");
const songImage = document.querySelector(".song-image");
const title = document.querySelector(".title");
const artistName = document.querySelector(".artist");
const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const startTime = document.querySelector(".start-time");
const totalDuration = document.querySelector(".total");
const playBtn = document.querySelector(".play");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const progressSlide = document.querySelector(".progress-slide");

const barWidth = progressContainer.offsetWidth;
const startPos = progressContainer.offsetLeft;

let isPlaying = false;
let songIndex = 0;
let ID;

const songsArray = [
    {
        name:"Nothing",
        artist:"Damataro",
        songSrc:"audio/Energetic Royalty Free Action Sports Background Music No Copyright.mp3",
        imgSrc:"img/cricket.jpg",
    },
    {
        name:"Energetic",
        artist:"Unknown",
        songSrc:"audio/ROYALTY FREE Trailer Background Music   Cinematic Trailer Royalty Free Music by .mp3",
        imgSrc:"img/power.jpg",
    },
    {
        name:"Into The Space",
        artist:"Unknown",
        songSrc:"audio/A Magical Journey Through Space – Leonell Cassio (No Copyright Music).mp3",
        imgSrc:"img/space.jpg"
    }
]

// Loads the song details and its source
function loadSong(song){
    const {name,artist,songSrc,imgSrc} = song;
    title.textContent = name;
    artistName.textContent = artist;
    audio.src = songSrc;
    songImage.src = imgSrc;
}

loadSong(songsArray[songIndex]);

function playSong(){
    playBtn.querySelector(".fas").classList.replace("fa-play","fa-pause");
    audio.play();
    isPlaying = true;
}

function pauseSong(){
    playBtn.querySelector(".fas").classList.replace("fa-pause","fa-play");
    audio.pause();
    isPlaying = false;
}

function playOrPauseSong(){
    if(!isPlaying){
        playSong();
    }
    else{
        pauseSong();
    }
}

function nextSong(){
    songIndex++;
    if(songIndex > songsArray.length-1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songsArray.length-1;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}

function setProgressBar(duration,currentTime){
    const width = (currentTime/duration)*100;
    progressBar.style.width = `${width}%`;
    progressSlide.style.left = `${width}%`;
}

function getTime(time){
    let seconds = time;
    const minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds%60);
    if(seconds < 10){
        return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;

    // Setting the width of the progress bar to indicate the song progress
    setProgressBar(duration,currentTime);
    // Setting the current time for the song
    startTime.textContent = getTime(currentTime);
}

function setAudioTime(xPos,width){
    const {duration} = audio;
    audio.currentTime = ((xPos/width)*duration);
}

function moveToPos(e){
    e.stopPropagation();
    console.log("CLick event getting executed");
    const xPos = e.offsetX;
    setAudioTime(xPos,barWidth);
}

function movePointer(e){
    console.log("Mouse event getting executed");
    e.stopPropagation();
    const currentPos = e.clientX;
    if(currentPos >= startPos && currentPos <= (startPos + barWidth)){
        const movePos = currentPos - startPos;
        progressSlide.style.left = `${movePos}px`;
        setAudioTime(movePos,barWidth);
    }
}

playBtn.addEventListener("click",playOrPauseSong);
forwardBtn.addEventListener("click",nextSong);
backwardBtn.addEventListener("click",prevSong);
audio.addEventListener("timeupdate",updateProgress);
// event listener which will indicate that the audio file is loaded(source is set)
audio.addEventListener("loadeddata",(e)=>{
    // Set the duration when the audio is loaded
    const {duration} = e.srcElement;
    if(duration){
        totalDuration.textContent = getTime(duration);
    }
})
progressContainer.addEventListener("click",moveToPos);
audio.addEventListener("ended",()=>{
    setTimeout(nextSong,500);
})

progressSlide.addEventListener("mousedown",()=>{
    progressSlide.style.transform = "translate(-25%,-40%) scale(0.8)";
    document.addEventListener("mousemove",movePointer);
})

progressSlide.addEventListener("mouseup",()=>{
    progressSlide.style.transform = "translate(-25%,-40%) scale(1)";
    document.removeEventListener("mousemove",movePointer);
})
