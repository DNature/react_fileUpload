const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

//! Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No File Uploaded' });
    }

    const file = req.files.file;

    //? SAVE FILE IN CLIENT/PUBLIC/UPLOADS FOLDER
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//~ Start Development server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}...`));