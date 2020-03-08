const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(fileUpload());
app.use(cors());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    };
    let uploader = req.files.uploader;
    console.log('uploader ', uploader)
    uploader.mv(`${__dirname}/client/public/uploads/${uploader.name}`, function(err) {
      if (err) return res.status(500).send(err);
      res.json({
          fileName: uploader.name,
          filePath: `/uploads/${uploader.name}`
      });
    });
})

app.listen(5000, () => {
    console.log('Server On 5000')
})