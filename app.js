const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;
const http = require('http');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
// Set view engine
app.set('view engine', 'ejs')
app.use("/public", express.static(__dirname + '/public')); // This line.
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
        fileSize: 30000000
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

app.get('/uploads', (req, res) => {
    fs.readdir(__dirname + "/public/uploads", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        res.render('index', {
            files: files
        });
    });
});



function remove(file) {
    fs.unlinkSync('./public/uploads/' + file);
}

app.get('/delete/:file', (req, res) => {
    remove(req.params.file);
    res.redirect("/");
});
/*
app.get('/delete/:id', (req, res) => {
    {_id: req.params.id}
    
  });
*/
app.listen(port, () => console.log(`Server started on port ${port}`));