'use strict';
let songsDataOriginal = [
    {
        "src": "./img/lemonade.png",
        "alt": "singer photo",
        "author": "Beyonce",
        "song": "Don't hurt Yourself",
        "srcSong": "./audio/beyonce.mp3"
    },
    {
        "src": "./img/dontstartnow.png",
        "alt": "singer photo",
        "author": "Dua Lipa",
        "song": "Don't start now",
        "srcSong": "./audio/dontstartnow.mp3"
    },
    {
        "src": "./img/linkinPark.jpeg",
        "alt": "singer photo",
        "author": "Linkin Park",
        "song": "Numb",
        "srcSong": "./audio/Linkin Park - Numb.mp3"
    },
    {
        "src": "./img/tomOdell.jpg",
        "alt": "singer photo",
        "author": "Tom Odell",
        "song": "Another Love",
        "srcSong": "./audio/Tom Odell-Another Love.mp3"
    }
    
]
document.addEventListener("DOMContentLoaded", function() {
    
    let index = 0,
        replay = true,
        songsData = JSON.parse(JSON.stringify(songsDataOriginal)),
        currentSong = "Don't hurt Yourself",
        currentT = 0;
    const imgPart = document.querySelector('.img_part'),
        prev = document.querySelector('.prev'),
        play = document.querySelector('.play_pause'),
        next = document.querySelector('.next'),
        mainBG = document.querySelector('.main_bg'),
        info = document.querySelector('.song_info'),
        length = document.querySelector('.length'),
        current = document.querySelector('.current'),
        volume = document.querySelector('.volume'),
        inputVolume = document.querySelector('#volume_range'),
        volumeRange = document.querySelector('.volume_range'),
        order = document.querySelector('.order'),
        inputProgress = document.querySelector('#progress');
    inputProgress.value = 0;
    current.innerHTML = "0:00";

    const audio = new Audio(songsDataOriginal[0].srcSong);

    const getTime = (seconds) => {
        if (Math.round(seconds % 60) < 10) return `${Math.floor(seconds / 60)}:0${Math.round(seconds % 60)}`;
        return `${Math.floor(seconds / 60)}:${Math.round(seconds % 60)}`;
    };

    const playSong = (src) => {
        audio.src = `${src}`;
        audio.currentTime = currentT;
        inputProgress.value = audio.currentTime;
        play.classList.remove("play");
        play.classList.add("pause");
        audio.play();
    };
      
    const pauseSong = () => {
    play.classList.remove("pause");
    play.classList.add("play");
    audio.pause();
    };

    const newSong = (i) => {
        const songSource = songsData[i];
        imgPart.innerHTML = '';
        imgPart.innerHTML = `<img src="${songSource.src}" alt="${songSource.alt}">`;
        info.innerHTML = '';
        info.innerHTML = `<div class="author">${songSource.author}</div>
        <div class="song">${songSource.song}</div>`;
        mainBG.innerHTML = '';
        mainBG.innerHTML = `<img src="${songSource.src}" alt="${songSource.alt}">`;
    };
    
    const launchSongByIndex = (arr, i) => {
        currentT = 0;
        currentSong = arr[i].song;
        newSong(i);
        playSong(arr[i].srcSong);
    }
    const ifNotReplayed = () => {
        if (index === songsData.length - 1) {
                songsData = songsData.sort(() => Math.random() - 0.5);
                index = 0;
            }  else if (index < songsData.length - 1){
                index += 1; 
            } else index = 0;
         if (currentSong === songsData[index].song) index ++; 
    }
    const playNextSong = () => {
        if(!replay) {
            ifNotReplayed()  
            launchSongByIndex(songsData, index); 
        } else {
            if(index < songsDataOriginal.length - 1) index++
            else index = 0;
            launchSongByIndex(songsDataOriginal, index);
        }
        
    };
    audio.addEventListener('loadedmetadata',() => length.innerHTML = `${getTime(audio.duration)}` );
    
    play.addEventListener("click", () => {
        if (currentT != 0) currentT = audio.currentTime;
        else currentT = 0;   
        if (audio.paused) {
            if(replay){
                currentSong = songsDataOriginal[index].song;
                playSong(songsDataOriginal[index].srcSong);
            } else {
                currentSong = songsData[index].song;
                playSong(songsData[index].srcSong);
            }
        } else {
            currentT = audio.currentTime;
            pauseSong();
        }
    });
    next.addEventListener("click", playNextSong);
    
    prev.addEventListener("click", () => {
        if(replay){
           if (index > 0) {
            index -= 1;
            } else index = songsDataOriginal.length - 1;
            launchSongByIndex(songsDataOriginal, index);
        }else {
            ifNotReplayed();
            launchSongByIndex(songsData, index);   
        }});
    order.addEventListener('click', () => {
        if (replay) {
            replay = false;
            order.innerHTML = ''; 
            order.innerHTML = `<img src="./img/344685_audio_shuffle_sound_video_arrow_icon.png" alt="shuffle">`; 
        } else {
            replay = true;
            order.innerHTML = ''; 
            order.innerHTML = `<img src="./img/344689_audio_replay_sound_video_circle_icon.png" alt="replay">`; 
        }
    });
    volume.addEventListener('click', () => {
        volumeRange.classList.toggle('hide');
    });
    
    audio.addEventListener("loadedmetadata", () => {
        inputProgress.max = audio.duration;
        inputVolume.max = audio.volume;
    });
    
    inputProgress.addEventListener("change", () => {
        audio.currentTime = inputProgress.value;
        currentT = audio.currentTime;
    });
    inputVolume.addEventListener("change", () => {
        audio.volume = inputVolume.value;
    });
    
    audio.addEventListener('timeupdate', () => {
        if (Math.abs(audio.currentTime-inputProgress.value) <= 2) inputProgress.value = audio.currentTime;
        current.innerHTML = getTime(audio.currentTime);
        if (audio.currentTime === audio.duration) playNextSong();
    });
})
