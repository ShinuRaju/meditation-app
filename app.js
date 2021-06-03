"use strict";
var select = function (el, all) {
    if (all === void 0) { all = false; }
    el = el.trim();
    var element;
    if (all) {
        element = Array.from(document.querySelectorAll(el));
    }
    else {
        element = document.querySelector(el);
    }
    if (element === null || element === undefined || element.length === 0) {
        console.log('elelement not found    ');
    }
    else {
        return (element);
    }
};
var songSelect = select('.songSelect', true);
var play = select('.play');
var movingCircle = select('.movingOutline circle');
var body = select('body');
var song = select('.song');
var timeDisplay = select('.timeDisplay');
var timeSelect = select('.timeSelect', true);
var outlineLen = movingCircle.getTotalLength();
// console.log(outlineLen)
var fakeduration = 120;
movingCircle.style.strokeDasharray = outlineLen;
movingCircle.style.strokeDashoffset = outlineLen;
play.addEventListener('click', function () {
    checkPlaying(song);
});
var checkPlaying = function (song) {
    if (song.paused) {
        song.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
    else {
        song.pause();
        play.classList.add('fa-play');
        play.classList.remove('fa-pause');
    }
};
song.ontimeupdate = function () {
    var currentTime = song.currentTime;
    var elapsed = fakeduration - currentTime;
    var seconds = Math.floor(elapsed % 60);
    var minutes = Math.floor(elapsed / 60);
    var progress = outlineLen - (currentTime / fakeduration) * outlineLen;
    movingCircle.style.strokeDashoffset = progress;
    timeDisplay.textContent = minutes + ":" + seconds;
    if (currentTime >= fakeduration) {
        song.pause();
        song.currentTime = 0;
        play.classList.add('fa-play');
        play.classList.remove('fa-pause');
    }
};
timeSelect.forEach(function (element) {
    element.addEventListener('click', function (e) {
        fakeduration = Number.parseInt(e.target.getAttribute('data-time'));
        timeDisplay.textContent = Math.floor(fakeduration / 60) + " : " + fakeduration % 60;
    });
});
songSelect.forEach(function (element) {
    element.addEventListener('click', function (e) {
        song.src = e.target.getAttribute('data-sound');
        // body.style.background =`url(${e.target.getAttribute('data-image')})`
        checkPlaying(song);
    });
});
