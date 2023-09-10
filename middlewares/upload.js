const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
        console.log("upload");
    }
});

const upload = multer({
    storage: multerConfig
})

module.exports = upload;