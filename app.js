const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;
const http = require('http');
// Set view engine
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/js')); // This line.
app.use(express.static('./public'));
app.get('/', (req, res) => {
    fs.readdir(__dirname + "/public/uploads", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        res.render('index', {
            files: files
        })
    });
});

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('files')

// Handle the upload route
app.post('/upload', (req, res) => {
    // res.send('done');
    upload(req, res, (err) => {
        res.redirect('/');
    })
})

function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['wav', 'mp3']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("audio/")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}

app.get('/uploads', (req, files) => {
    fs.readdir(__dirname + "/public/uploads", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        res.render('index', {
            files: files
        })
    });
});

function remove (file)  {
    fs.unlink('./public/uploads/' + file);
}

app.get('/delete/', function (req, res) {

});
/*
app.get('/delete/:id', (req, res) => {
    {_id: req.params.id}
    
  });
*/
app.listen(port, () => console.log(`Server started on port ${port}`));