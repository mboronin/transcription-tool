document.addEventListener("keyup", playpause, false);
// Keyboard shortcut for play and pause
function playpause(event) {
var x = event.keyCode;
if (x === 112 && event.shiftKey || x === 80 && event.shiftKey) {
audio.play();

} else if (x === 115 && event.shiftkey || x === 83 && event.shiftKey) {
audio.pause();
}
}

document.addEventListener("keyup", startloopKb, false);
//Keyboardshortcut for repeat mode
function startloopKb(event) {
    var x = event.keyCode;
    if (x === 67 && event.shiftKey || x === 99 && event.shiftKey) {
        loop_select();

    } else if (x === 70 && event.shiftKey || x === 102 && event.shiftKey) {
        loop_end();
    }
}

document.addEventListener("keyup", stamp_timeKb, false);
//Keyboardshortcut for repeat mode
function stamp_timeKb(event) {
    var x = event.keyCode;
    if (x === 84 && event.shiftKey || x === 116 && event.shiftKey) {
        stamp_time();
    }
}





// Changing the playback speed -->
speed_half = function () {
audio.playbackRate = 0.5;
}
speed_normal = function () {
audio.playbackRate = 1;
}
speed_onehalf = function () {
audio.playbackRate = 1.5;
}
speed_two = function () {
audio.playbackRate = 2;
}

// Play the selected file from the playlist -->
function selectSong() {
songs = document.getElementsByName('song');
for (i = 0; i < songs.length; i++) {
if (songs[i].checked) {
  name = document.getElementsByName('song')[i].value;
}
}
name = "./public/uploads/" + name;
document.getElementById("songselector").setAttribute("src", name);
var x = document.getElementById("songselector");
audio.load();
audio.play();
}

// Get the selected time to loop and start -->
loop_select = function () {


var dur = document.getElementById("audio");
var loopy_value = document.getElementById('loopy').value
var loopy_int = loopy_value * 1000;

var a = dur.currentTime;
var b = a - loopy.value;

audio.currentTime = b;
inter = setInterval(function () {
audio.currentTime = b;
}, loopy_int)
}

// End the loop -->
loop_end = function () {
clearInterval(inter);
inter = false;
}

stamp_time = function () {
    var time = document.getElementById("audio");
    var cur_time = time.currentTime;

    var date = new Date(null);
    date.setSeconds(cur_time);
    var formated_time = date.toISOString().substr(11, 8);

    stamp = document.getElementById("editor");
    stamp.value += formated_time + " ";

    CKEDITOR.instances['editor'].setData(stamp);
}