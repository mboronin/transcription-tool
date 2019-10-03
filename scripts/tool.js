function pause() {
    player.pause();
}
function play() {
    player.play();
}
function loop() {
    player.play();
}
function onchange() {
    var files = this.files;
    var file = URL.createObjectURL(files[0]);
    player.src = file;
    player.play();
};
CKEDITOR.replace('texteditor');