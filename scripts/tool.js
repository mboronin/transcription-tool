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

var PLACEHOLDERS = [{
    id: 1,
    name: 'Speaker1',
    title: 'Speaker 1',
    description: 'This is speaker one.'
  },
  {
    id: 2,
    name: 'Speaker2',
    title: ' Speaker 2',
    description: 'This is speaker 2.'
  },
  {
    id: 3,
    name: 'Speaker3',
    title: ' Speaker 3',
    description: 'This is speaker 3.'
  },
  {
    id: 4,
    name: 'Speaker4',
    title: ' Speaker 4',
    description: 'This is speaker 4.'
  }
];


function textTestCallback(range) {
  if (!range.collapsed) {
    return null;
  }

  return CKEDITOR.plugins.textMatch.match(range, matchCallback);
}

function matchCallback(text, offset) {
  var pattern = /\[{2}([A-z]|\])*$/,
    match = text.slice(0, offset)
    .match(pattern);

  if (!match) {
    return null;
  }

  return {
    start: match.index,
    end: offset
  };
}

function dataCallback(matchInfo, callback) {
  var data = PLACEHOLDERS.filter(function (item) {
    var itemName = '[[' + item.name + ']]';
    return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
  });

  callback(data);
}
stamp_time = function () {
  var time = document.getElementById("audio");
  var cur_time = time.currentTime;

  var date = new Date(null);
  date.setSeconds(cur_time);
  var formated_time = date.toISOString().substr(11, 8);

  CKEDITOR.instances['editor'].insertHtml("[" + formated_time + "] ");
}


String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  li.innerHTML= '<a href=#' + inputValue + '>' + inputValue + '</a>'
  var tobeins = document.createElement("p");
  tobeins.setAttribute("id", inputValue);
  tobeins.innerHTML = '[[' + inputValue + ']]'
  console.log(tobeins)
  CKEDITOR.instances['editor'].insertHtml('[[' + inputValue + ']]');
  //var t = document.createTextNode(inputValue);
  //li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}