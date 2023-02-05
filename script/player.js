const container = document.querySelector(".video-container"),
mainvideo = container.querySelector("video"),
progressBar = container.querySelector(".progress-bar"),
videoTimeLine = container.querySelector(".video-timeline"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward= container.querySelector(".skip-forward i"),
volumeBtn = container.querySelector(".volume i"),
currentVidTime = container.querySelector(".current-time"), 
videoDuration = container.querySelector(".video-duration"),
volumeSlider = container.querySelector(".left input"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
picInPicBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i"),
playPauseBtn = container.querySelector(".play-pause i");

const hideControls = () => {
    if(mainvideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls")
    }, 6000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    // clearTimeout(timer);
    hideControls();
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    
    if(hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

mainvideo.addEventListener("timeupdate", e =>{
     let { currentTime, duration } = e.target;
     let percent = (currentTime / duration) * 100;
     progressBar.style.width = `${percent}%`;
     currentVidTime.innerText = formatTime(currentTime); 
});
mainvideo.addEventListener("loadeddata", e => {
    videoDuration.innerText = formatTime(e.target.duration);
});
videoTimeLine.addEventListener("click", e => {
    let timelineWidth = videoTimeLine.clientWidth;
    mainvideo.currentTime = (e.offsetX / timelineWidth) * mainvideo.duration;
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeLine.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainvideo.currentTime = (e.offsetX / timelineWidth) * mainvideo.duration;
    currentVidTime.innerText = formatTime(mainvideo.currentTime); 
};

videoTimeLine.addEventListener("mousedown", () => {
    videoTimeLine.addEventListener("mousemove", draggableProgressBar);
});
container.addEventListener("mouseup", () => {
    videoTimeLine.removeEventListener("mousemove", draggableProgressBar);
});

videoTimeLine.addEventListener("mousemove", e => {
    const progressTime = videoTimeLine.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeLine.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainvideo.duration;
    progressTime.innerText = formatTime(percent);
});
volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")){
        mainvideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainvideo.volume=0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
        volumeSlider.value=mainvideo.volume;
    }
});
volumeSlider.addEventListener("input", e => {
    mainvideo.volume= e.target.value;
    if(e.target.value == 0){
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});
speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("showSpeed");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainvideo.playbackRate= option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});
picInPicBtn.addEventListener("click", () =>{
    mainvideo.requestPictureInPicture();
});
fullScreenBtn.addEventListener("click", () => {
    // container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});
document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded"){
        speedOptions.classList.remove("showSpeed"); 
    }
});
playPauseBtn.addEventListener("click", () => {
    mainvideo.paused ? mainvideo.play() : mainvideo.pause();
});
mainvideo.addEventListener("play", () => {
    playPauseBtn.classList.replace("fa-play","fa-pause");
});
mainvideo.addEventListener("pause", () => {
    playPauseBtn.classList.replace("fa-pause","fa-play");
});

skipBackward.addEventListener("click", () => {
    mainvideo.currentTime -=5;
});
skipForward.addEventListener("click", () => {
    mainvideo.currentTime +=5;
});

