const select =  (el:string, all:boolean = false) => {
    
    el = el.trim();
    let element:any;

    if (all){
        element = Array.from(document.querySelectorAll(el));
    }
    else{
        element = document.querySelector(el)
    }

    if(element === null || element === undefined ||  element.length === 0){
        console.log('elelement not found    ')
    }else{
        return (element)
    }
}


const songSelect = select ('.songSelect', true);
const play = select('.play');
const movingCircle = select('.movingOutline circle')
const body = select('body');
const song = select('.song');
const timeDisplay = select ('.timeDisplay');
const timeSelect = select('.timeSelect', true)

const outlineLen =  movingCircle.getTotalLength();
// console.log(outlineLen)
let fakeduration = 120;

movingCircle.style.strokeDasharray = outlineLen;
movingCircle.style.strokeDashoffset = outlineLen;

play.addEventListener('click', () => {
    checkPlaying(song);
    
})


const checkPlaying =  (song:any) => {
if(song.paused){
    song.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');

}
else{
    song.pause();
    play.classList.add ('fa-play');
    play.classList.remove('fa-pause');

}
}

song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeduration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLen - (currentTime / fakeduration) * outlineLen;
movingCircle.style.strokeDashoffset = progress;

timeDisplay.textContent = `${minutes}:${seconds}`;

if(currentTime >= fakeduration){
song.pause();
song.currentTime = 0;
play.classList.add('fa-play');
play.classList.remove('fa-pause');

}

}
timeSelect.forEach((element:any) => {
    element.addEventListener('click', (e:any) => {
        fakeduration = Number.parseInt(e.target.getAttribute('data-time'));
        timeDisplay.textContent = `${Math.floor(fakeduration / 60)} : ${fakeduration % 60}`
    })
});



songSelect.forEach((element:any ) => {
    element.addEventListener('click', (e:any) => {
        song.src = e.target.getAttribute('data-sound');
        // body.style.background =`url(${e.target.getAttribute('data-image')})`
        checkPlaying(song);
    })
});
